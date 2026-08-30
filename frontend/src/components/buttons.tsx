import { useState, useEffect, useContext } from "react";
import { API_URL } from "../lib/api";
import { AuthContext } from "../App";

export default function Buttons() {
  const { userId } = useContext(AuthContext)
  const [Transactions, setTransactions] = useState([]);
  const [Income, setIncome] = useState([]);
  const [Expense, setExpense] = useState([]);
  const [buttons, setButtons] = useState<string | null>(null);



  useEffect(() => {
    async function load_transactions() {
      const res = await fetch(`${API_URL}/transactions?`, {
        method: 'GET',
        credentials: "include"
      })
      const data = await res.json()
      setTransactions(data)
    }
    load_transactions();
  }, [userId]);

  useEffect(() => {
    async function load_income() {
    const res = await fetch(`${API_URL}/incomes?`, {
        method: 'GET',
        credentials: "include"
      })
    const data = await res.json();
      setIncome(data);

    } load_income();
  }, [userId]);

  useEffect(() => {
    async function load_expense() {
       const res = await fetch(`${API_URL}/expenses?`, {
        method: 'GET',
        credentials: "include"
      })
      const data = await res.json()
      setExpense(data)
    } load_expense();
  }, [userId]);


  const formatCurrency = (value: any, currecyCode = 'IDR', locale = 'id-ID') => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currecyCode,
    }).format(value)
  }



  return (
    <div className="p-4">
      <div className="p-2 overflow-x-auto w-fit bg-[#f1f5f9] rounded-md grid grid-cols-3 gap-2">
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
      <div className="p-2 flex flex-col items-center md:block">
        {(!buttons || buttons === 'All') &&
          <div className="w-full overflow-x-auto h-64 overflow-y-auto ">
            <table className="w-full text-center">
              <thead className="border border-t-0 border-r-0 border-l-0 border-[#dbdbdb] text-sm text-[#6b6375] sticky top-0 bg-[#fafafa] ">
                <tr>
                  <th>Date</th>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody className="text-xs text-[#6b6375] capitalize">
                {Transactions.length == 0 ? (
                  <p className="text-[#6b6375] text-sm">No Transactions Found</p>
                ):(Transactions.map((t: any) => (
                  <tr key={t.id} className="text-sm">
                    <td>{t.created_at.split("T", 1)}</td>
                    <td>{t.item}</td>
                    <td>{t.category}</td>
                    <td>{formatCurrency(t.amount)}</td>
                    <td style={{ color: t.type === 'Income' ? '#11e002' : '#fc0000' }}>{t.type}</td>
                  </tr>
                )
                )
                )}
              </tbody>
            </table>
          </div>
        }
        {buttons === 'Income' &&
          <div  className="w-full overflow-x-auto h-64 overflow-y-auto">
            <table className="w-full text-center capitalize">
              <thead className="border border-t-0 border-r-0 border-l-0 border-[#dbdbdb] text-sm text-[#6b6375] sticky top-0 bg-[#fafafa]">
                <tr>
                  <th>Date</th>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody className="text-xs text-[#6b6375]">
                {Income.length == 0 ? (
                  <p className="text-[#6b6375] text-sm">No Transactions Found</p>
                ):(
                  Income.map((i: any) => (
                  <tr key={i.id} className="text-sm capitalize">
                    <td>{i.created_at.split("T", 1)}</td>
                    <td>{i.item}</td>
                    <td>{i.category}</td>
                    <td>{formatCurrency(i.amount)}</td>
                    <td style={{ color: i.type === 'Income' ? '#11e002' : '#fc0000' }}>{i.type}</td>
                  </tr>
                )
                )
                )}
              </tbody>
            </table>
          </div>
        }


        {buttons === 'Expense' &&
          <div className="w-full overflow-x-auto h-64 overflow-y-auto">
            <table className="w-full text-center capitalize">
              <thead className="border border-t-0 border-r-0 border-l-0 border-[#dbdbdb] text-sm text-[#6b6375] sticky top-0 bg-[#fafafa]">
                <tr>
                  <th>Date</th>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody className="text-xs text-[#6b6375]">
                {Expense.length == 0 ? (
                  <p className="text-[#6b6375] text-sm">No Transactions Found</p>
                ):(
                  Expense.map((e: any) => (
                  <tr key={e.id} className="text-sm">
                    <td>{e.created_at.split("T", 1)}</td>
                    <td>{e.item}</td>
                    <td>{e.category}</td>
                    <td>{formatCurrency(e.amount)}</td>
                    <td style={{ color: e.type === 'Income' ? '#11e002' : '#fc0000' }}>{e.type}</td>
                  </tr>
                )
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


