import Header from './components/Header';
import NavSidebar from './components/NavSidebar';
import MedianScoreChart from './components/charts/MedianScoreChart';
import FiltersPanel from './components/FiltersPanel';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import LoanAmountChart from './components/charts/LoanAmountChart';
import LoanTypeChart from './components/charts/LoanTypeChart';
import DPAChart from './components/charts/DPAChart';
import DemographicInfoLayout from './components/charts/DemographicInfoLayout';
import { FiltersProvider } from './components/FiltersContext';

function App() {
  return (
    <FiltersProvider>
      <BrowserRouter>
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="flex flex-1 w-full min-h-0">
            <div className="flex-shrink-0">
              <NavSidebar />
            </div>
            <main className="p-4 md:p-6flex-1 bg-gray-50 w-full overflow-auto">
              <Routes>
                <Route path="/" element={<MedianScoreChart />} />
                <Route path="/loan-amount" element={<LoanAmountChart />} />
                <Route path="/loan-type" element={<LoanTypeChart />} />
                <Route path="/dpa" element={<DPAChart />} />
                <Route path="/demographics" element={<DemographicInfoLayout />} />
                {/* <Route path="*" element={<BigChart />} /> */}
              </Routes>
            </main>
            <div className="flex-shrink-0">
              <FiltersPanel />
            </div>
          </div>
        </div>
      </BrowserRouter>
    </FiltersProvider>
  );
}



export default App;



// function App() {
//   return (

//     <BrowserRouter>
//       <div className="flex min-h-screen flex-col bg-gray-50">
//         <Header />
//         <div className="flex flex-1 w-full min-h-0">
//           <div className="flex-shrink-0">
//             <NavSidebar />
//           </div>
//           <main className="flex-1 p-4 md:p-6 bg-gray-50 min-h-0 overflow-auto">
//             <Routes>
//               <Route path="/" element={<MedianScoreChart />} />
//               <Route path="/loan-amount" element={<LoanAmountChart />} />
//               <Route path="/loan-type" element={<LoanTypeChart />} />
//               <Route path="/dpa" element={<DPAChart />} />
//               <Route path="/demographics" element={<DemographicInfoLayout />} />
//               {/* <Route path="*" element={<BigChart />} /> */}
//             </Routes>
//           </main>
//           <div className="hidden md:block flex-shrink-0">
//             <FiltersPanel />
//           </div>
//         </div>
//       </div>
//     </BrowserRouter>
//   );


// }