import { useState } from 'react';
import axios from 'axios';
import './App.css';

export default function Home() {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [res, setRes] = useState([]);

  const options = {
    method: 'GET',
    url: 'https://car-data.p.rapidapi.com/cars',
    params: {
      limit: '10',
      page: '0',
      make: make,
      model: model
    },
    headers: {
      'x-rapidapi-key': '190d7c7a5amshcca1062230d7cd8p104e29jsn955db023a49e',
      'x-rapidapi-host': 'car-data.p.rapidapi.com'
    }
  };

  const fetchCarDetails = async e => {
    e.preventDefault();
    try {
      const response = await axios.request(options);
      setRes(response.data);
    } catch (error) {
      console.error('Error fetching car details:', error);
    }
  };

  return (
    <div className="flex flex-col items-center relative min-h-screen">
      <h2 className="font-raleway font-bold text-6xl text-primary pt-20 pb-6 md:text-3xl">
        Car <span className="text-secondary">Data</span> App
      </h2>
      <h3 className="text-secondary text-2xl font-raleway font-bold uppercase tracking-wide mb-12 md:text-base md:px-4 md:text-center">
        Get Different Car Information
      </h3>
      <div className="flex flex-col justify-between items-center w-full md:items-center">
        <form className="flex w-full justify-center md:flex-col md:w-5/6" onSubmit={fetchCarDetails}>
          <input
            type="text"
            className="border-none outline-none w-1/5 bg-primary px-4 py-2 mx-2 rounded-sm font-raleway md:w-full md:my-2"
            placeholder="Make..."
            value={make}
            onChange={e => setMake(e.target.value)}
          />
          <input
            type="text"
            className="border-none outline-none w-1/5 bg-primary px-4 py-2 mx-2 rounded-sm font-raleway md:w-full md:my-2"
            placeholder="Model..."
            value={model}
            onChange={e => setModel(e.target.value)}
          />
          <button
            type="submit"
            className="outline-none border border-active font-bold font-raleway ml-4 px-12 py-2 rounded-sm bg-secondary text-bc transition duration-300 hover:bg-bc hover:text-primary md:ml-0 md:mt-4"
          >
            Search
          </button>
        </form>
        <div className="flex flex-col text-primary text-sm text-raleway mt-12 w-4/6 h-4/5 md:flex-col md:w-4/6 md:h-full md:mb-12">
          <table className="bg-white w-full text-primary mb-8 md:text-sm md:mx-2">
            <thead className="font-raleway uppercase tracking-wide text-secondary">
              <tr>
                <th className="border border-x-0 text-left px-4 py-4">
                  <span className="text-danger">Year</span>
                </th>
                <th className="border border-x-0 text-left px-4 py-4">
                  <span className="text-danger">Type</span>
                </th>
                <th className="border border-x-0 text-left px-4 py-4">
                  <span className="text-danger">Make</span>
                </th>
                <th className="border border-x-0 text-left px-4 py-4">
                  <span className="text-danger">Model</span>
                </th>
              </tr>
            </thead>
            <tbody className="text-primary">
              {res.length ? (
                res.map((info, index) => (
                  <tr key={index}>
                    <td className="border border-x-0 border-secondary text-left px-4 py-4">
                      <span className="text-danger">{info.year}</span>
                    </td>
                    <td className="border border-x-0 border-secondary text-left px-4 py-4">
                      <span className="text-danger">{info.type}</span>
                    </td>
                    <td className="border border-x-0 border-secondary text-left px-4 py-4">
                      <span className="text-danger">{info.make}</span>
                    </td>
                    <td className="border border-x-0 border-secondary text-left px-4 py-4">
                      <span className="text-danger">{info.model}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center px-4 py-4">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col mt-10 justify-end h-36 md:h-24">
        <p className="block mb-10 text-center text-secondary text-xs">
          Made by RapidAPI DevRel Team -{' '}
          <a
            className="hover:text-active"
            href="https://github.com/RapidAPI/DevRel-Examples-External"
          >
            See more examples like this
          </a>
        </p>
      </div>
    </div>
  );
}
