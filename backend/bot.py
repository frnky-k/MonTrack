import datetime
import os
from calendar import monthrange
from babel.numbers import format_currency

from dotenv import load_dotenv
from sqlalchemy import desc
from sqlalchemy.orm import sessionmaker
from telegram import Update
from telegram.ext import (
    ApplicationBuilder,
    CommandHandler,
    ContextTypes,
    MessageHandler,
    filters,
)

from models import Transactions, engine, TokenPending

load_dotenv()
TOKEN = os.getenv("BOT_TOKEN")
if not TOKEN:
    raise ValueError("Token Not Found")
Session = sessionmaker(bind=engine)


CATEGORY_KEYWORDS = {
    "food": ["chicken", "lunch", "breakfast", "dinner"],
    "transport": ["gojek", "grab", "maxim", "park", "fuel", "Toll"],
    "bill": ["electricity", "wifi", "internet"],
}


def parse_expense(text):
    is_income = text.startswith("+")
    if is_income:
        text = text[1:].strip()

    item, amount = text.rsplit(" ", 1)
    amount = amount.replace(".", "")
    transaction_type = "Income" if is_income else "Expense"
    return item, float(amount), transaction_type


def handle_category(item):
    item_lower = item.lower()
    for category, keywords in CATEGORY_KEYWORDS.items():
        if any(kw in item_lower for kw in keywords):
            return category
    return "uncategorized"


async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    print("RECEIVED:", update.effective_message.text if update.effective_message else None)
    message = update.effective_message
    if message is None or message.text is None:
        return
    text = message.text
    user_id = message.chat_id
    try:
        item, amount, transaction_type = parse_expense(text)
        category = handle_category(item) if transaction_type == "Expense" else "Income"

    except ValueError:
        await message.reply_text(
            "⚠️Please send your Expenses like: item amount (e.g 'chicken 15000')"
        )
        return
    session = Session()
    new_expenses = Transactions(
        user_id=user_id,
        item=item,
        category=category,
        amount=amount,
        type=transaction_type,
    )
    session.add(new_expenses)
    session.commit()
    session.refresh(new_expenses)
    session.close()
    await message.reply_text(
        f"✅ Saved, {format_currency(amount, 'IDR', locale='id_ID')} Spent"
        if transaction_type == "Expense"
        else f"✅ Saved {format_currency(amount, 'IDR', locale='id_ID')} as Income"
    )


async def summary_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        message = update.effective_message
        if message is None:
            return
        user_id = message.chat_id
        session = Session()
        start_date = datetime.datetime(2026, 1, 1).astimezone()
        end_date = datetime.datetime(2026, 12, 31, 23, 59, 59).astimezone()

        results = (
            session.query(Transactions)
            .filter(
                Transactions.user_id == user_id,
                Transactions.created_at.between(start_date, end_date),
            )
            .all()
        )
        if not results:
            await message.reply_text("⚠️You haven't add any Expenses")
            return
        lines = "\n".join(f"{e.item}: Rp.{e.amount}" for e in results)
        total = sum(e.amount for e in results)
        await message.reply_text(f"""All Time Expenses Summary💸 : \n
{lines}\n
Total Expenses 💰 = Rp.{total}
                                 """)
        session.close()

    except TypeError:
        assert update.effective_message is not None
        await update.effective_message.reply_text(
            "Something went Wrong, Please go to /help"
        )
        return


async def summary_monthly(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        message = update.effective_message
        if message is None:
            return
        user_id = message.chat_id
        session = Session()
        now = datetime.datetime.now().astimezone()
        first_day = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)

        _, last_day_num = monthrange(now.year, now.month)
        last_day = now.replace(
            day=last_day_num, hour=23, minute=59, second=59, microsecond=99999
        )

        results = (
            session.query(Transactions)
            .filter(
                Transactions.user_id == user_id,
                Transactions.created_at.between(first_day, last_day),
            )
            .all()
        )
        if not results:
            await message.reply_text("⚠️You haven't add any Expenses")
            return
        lines = "\n".join(f"{e.item}: Rp.{e.amount}" for e in results)
        total = sum(e.amount for e in results)

        await message.reply_text(f"""{now.strftime("%B")} Expenses Summary💸 : \n
{lines}\n
Total Expenses 💰 = Rp.{total}
                                 """)
        session.close()

    except TypeError:
        assert update.effective_message is not None
        await update.effective_message.reply_text(
            "Something went Wrong, Please go to /help"
        )
        return


# async def start_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
#     try:
#         message = update.effective_message
#         if message is None:
#             return

#         await message.reply_text("""
#                                  Hello there! 👋 Welcome to MonTrack! >
# I’m your personal expense tracker right here in Telegram. No need to download extra apps or fill out messy spreadsheets—just chat with me, and I’ll keep your budget in check! 💸

# You can tell me what you spent, I’ll log it and help you see where your money is going.

# Ready to get started? Send your first expense right now, or type /help to see what I can do!
#                          """)
#     except TypeError:
#         assert update.effective_message is not None
#         await update.effective_message.reply_text(
#             "Something went Wrong, Please go to /help"
#         )
#         return


async def help_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        message = update.effective_message
        if message is None:
            return

        await message.reply_text("""
                                 Here is how you can use me to track your money:

1. Add a New Expense ➕
It's as easy as sending a text! Just type the amount and what you bought.

Example: lunch 15000 or groceries 50000

2. Check Your Total 📊
Want to know how much you've spent this week or month?

Command: /summary, /monthlysum (for monthly expenses summary)

3. Delete a Mistake ❌
Made a typo? No worries!
Command: /undo to delete your last entry. """)

    except TypeError:
        assert update.effective_message is not None
        await update.effective_message.reply_text(
            "Something went Wrong, Please go to /help"
        )
        return

async def handle_start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    session = Session()
    args = context.args
    if not args:
        return
    link_token = args[0]
    chat_id = update.effective_chat.id
    pending = session.query(TokenPending).filter_by(token=link_token).first()
    if pending and not pending.chat_id:
        pending.chat_id = chat_id
        pending.confirmed_at = datetime.datetime.now()
        session.commit()
        await update.effective_message.reply_text("Linked, You can go back to wesbite")




async def delete_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        message = update.effective_message
        if message is None:
            return
        user_id = message.chat_id
        session = Session()

        filter_last = (
            session.query(Transactions)
            .filter(Transactions.user_id == user_id)
            .order_by(desc(Transactions.id))
            .first()
        )
        if filter_last:
            session.delete(filter_last)
            session.commit()
            await message.reply_text("Your last Expenses has been deleted")
            session.close()
    except TypeError:
        assert update.effective_message is not None
        await update.effective_message.reply_text(
            "Something went Wrong, Please go to /help"
        )
        return


app = ApplicationBuilder().token(TOKEN).build()
app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
app.add_handler(CommandHandler("start", handle_start))
app.add_handler(CommandHandler("help", help_message))
app.add_handler(CommandHandler("undo", delete_message))
app.add_handler(CommandHandler("summary", summary_message))
app.add_handler(CommandHandler("monthlysum", summary_monthly))
print("Bot is running....")
app.run_polling()
