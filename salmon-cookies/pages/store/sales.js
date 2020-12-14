import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Sales() {

  const [store, setStore] = useState({});
  const [allStores, setAllStores] = useState([]);
  const [totals, setTotals] = useState([0,0,0,0,0,0,0,0,0,0]);
  const [hours, setHours] = useState(['Location','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','Total'])

  console.log(allStores);


  function handleChange(event) {
    event.preventDefault();
    let value = event.target.value;
    let name = event.target.name;
      if(name==='location') {
        setStore({...store, location: value})
      }
      else if(name==='min') {
        setStore({...store, min: value})
      }
      else if(name==='max') {
        setStore({...store, max: value})
      }
      else if(name==='avgCookies') {
        setStore({...store, avgCookies: value})
      }
    
  }

  function handleSubmit(event) {
    event.preventDefault();

    let arr = [];
    let total = 0;
    let storeTotals = [...totals];

    for(let i = 0; i<9; i++) {
      let random = Math.ceil(Math.random() * ((store.max) - (store.min)) + store.min) * (store.avgCookies);

      total+=random;
      storeTotals[i]+=random;

      arr.push(random);
    }

    storeTotals[storeTotals.length-1] +=total;

    setTotals(storeTotals);

    arr.push(total);

    setStore({...store, perHour: arr});
    setAllStores([...allStores, {...store, perHour: arr}])

  }

  return (
    <>

<Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

      <header>
      <nav>
        <ul>
          <Link href="/store/sales">
            <li>Sales</li>
          </Link>
        </ul>
      </nav>
      </header>



      <form onSubmit={handleSubmit}>
        <label> In what city is your new shop located?</label>
        <input type='text' name="location" value={store.location} onChange={handleChange}/>

        <label> What is the minimum customers per hour?</label>
        <input name="min" type='number' value={store.min} onChange={handleChange}/>

        <label> What is the maximum customer per hour?</label>
        <input type='number' name="max" value={store.max} onChange={handleChange}/>

        <label> What is the average cookies for each sale?</label>
        <input type='number' name="avgCookies" value={store.avgCookies} onChange={handleChange}/>

        <button type="submit">Submit</button>

      </form>

      <table>
        <thead>
          <tr>
  {hours.map(hour=> <th>{hour}</th>)}
          </tr>
        </thead>
        <tbody>
          {allStores.map(thing=>{
            return <tr><td>{thing.location}</td>{thing.perHour.map(number=><td>{number}</td>)}</tr>
          })}
          <tr><td>Store Totals</td>{totals.map(total=><td>{total}</td>)}</tr>
        </tbody>
      </table>

      <p>{store.location}</p>
      <p>{store.min}</p>
      <p>{store.max}</p>
      <p>{store.avgCookies}</p>

      </main>
    </>
  )

}