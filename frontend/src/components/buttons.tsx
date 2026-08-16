import { useState, useEffect } from "react";


export default function Buttons() {
  const [Transactions, setTransactions] = useState([]);
  const [Income, setIncome] = useState([]);
  const [Expense, setExpense] = useState([]);
  const [buttons, setButtons] = useState<string | null>(null);

  const userId = 1387475697;

  useEffect(() => {
    async function load_transactions() {
      const res = await fetch(`http://localhost:8000/transactions?user_id=${userId}`)
      const data = await res.json()
      setTransactions(data)
    }
    load_transactions();
  }, []);

  useEffect(() => {
    async function load_income() {
      const res = await fetch(`http://localhost:8000/incomes?user_id=${userId}`);
      const data = await res.json();
      setIncome(data);

    } load_income();
  }, []);

  useEffect(() => {
    async function load_expense() {
      const res = await fetch(`http://localhost:8000/expenses?user_id=${userId}`);
      const data = await res.json()
      setExpense(data)
    } load_expense();
  }, []);


  const formatCurrency = (value: any, currecyCode = 'IDR', locale = 'id-ID') => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currecyCode,
    }).format(value)
  }



  return (
    <div className="p-4">
      <div className="p-2 w-fit bg-[#f1f5f9] rounded-md grid grid-cols-3 gap-2">
        <button onClick={() => setButtons('All')}
          style={{ backgroundColor: (!buttons || buttons === 'All') ? '#fff' : '#f1f5f9' }}
          className="text-sm rounded-md px-2 py-1 font-semibold">All</button>
        <button onClick={() => setButtons('Income')}
          style={{ backgroundColor: buttons === 'Income' ? '#fff' : '#f1f5f9' }}
          className="text-sm rounded-md px-2 py-1 font-semibold">Income</button>
        <button onClick={() => setButtons('Expense')}
          style={{ backgroundColor: buttons === 'Expense' ? '#fff' : '#f1f5f9' }}
          className="text-sm rounded-md px-2.5 py-1 font-semibold">Expense</button>
      </div>
      <div className="p-2 w-full">
        {(!buttons || buttons === 'All') &&
          <div>
            <table className="w-full text-center">
              <thead className="border border-t-0 border-r-0 border-l-0 border-[#dbdbdb] text-sm text-[#6b6375]">
                <tr>
                  <th>Date</th>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody className="text-xs text-[#6b6375]">
                {Transactions.map((t: any) => (
                  <tr key={t.id} className="text-sm">
                    <td>{t.created_at.split("T", 1)}</td>
                    <td>{t.item}</td>
                    <td>{t.category}</td>
                    <td>{formatCurrency(t.amount)}</td>
                    <td style={{ color: t.type === 'Income' ? '#11e002' : '#fc0000' }}>{t.type}</td>
                  </tr>
                )
                )}
              </tbody>
            </table>
          </div>
        }
        {buttons === 'Income' &&
          <div>
            <table className="w-full text-center">
              <thead className="border border-t-0 border-r-0 border-l-0 border-[#dbdbdb] text-sm text-[#6b6375]">
                <tr>
                  <th>Date</th>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody className="text-xs text-[#6b6375]">
                {Income.map((i: any) => (
                  <tr key={i.id} className="text-sm capitalize">
                    <td>{i.created_at.split("T", 1)}</td>
                    <td>{i.item}</td>
                    <td>{i.category}</td>
                    <td>{formatCurrency(i.amount)}</td>
                    <td style={{ color: i.type === 'Income' ? '#11e002' : '#fc0000' }}>{i.type}</td>
                  </tr>
                )
                )}
              </tbody>
            </table>
          </div>
        }


        {buttons === 'Expense' &&
          <div>
            <table className="w-full text-center">
              <thead className="border border-t-0 border-r-0 border-l-0 border-[#dbdbdb] text-sm text-[#6b6375]">
                <tr>
                  <th>Date</th>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody className="text-xs text-[#6b6375]">
                {Expense.map((e: any) => (
                  <tr key={e.id} className="text-sm">
                    <td>{e.created_at.split("T", 1)}</td>
                    <td>{e.item}</td>
                    <td>{e.category}</td>
                    <td>{formatCurrency(e.amount)}</td>
                    <td style={{ color: e.type === 'Income' ? '#11e002' : '#fc0000' }}>{e.type}</td>
                  </tr>
                )
                )}
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  )
}


