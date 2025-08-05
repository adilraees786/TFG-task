
import React, { useEffect } from 'react'
import { getProducts } from '../Zustand/Api';
import Card from '../ReusableComponents/Cards';


const ProductApi = () => {
const {  Products, isLoading, error,  fetchProductData} =getProducts();

  useEffect(() => {
     fetchProductData();
  }, []);

  console.log("====", Products);
  
  return (
      <div className="overflow-x-auto " >
      
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      
        
        
          {!isLoading && !error && Array.isArray(Products) && (
            Products.length > 0 ? (
            Products.map((items) => (
                <div key={items.id} className=" bg-white hover:bg-gray-50 gap-2">
              <Card  image={items.category.image}  title={items.title} price={items.price}/>
                </div>
              ))
            ) : (
              <p></p>
            )

          )}
     

      
    </div>
  
  )
}

export default ProductApi;
// import { getProducts } from '../Zustand/Api';


// const ProductApi = () => {
// const {  Products, isLoading, error, fetchData} =getProducts();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   console.log("====", Products);
  
//   return (
//       <div className="overflow-x-auto " >
      
//       {isLoading && <p>Loading...</p>}
//       {error && <p className="text-red-500">Error: {error}</p>}
//       <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
//         <thead>
//           <tr className="bg-gray-100 text-left">
//             <th className="px-6 py-3 border-b text-gray-600 font-medium">ID</th>
//             <th className="px-6 py-3 border-b text-gray-600 font-medium">Title</th>
//             <th className="px-6 py-3 border-b text-gray-600 font-medium">price</th>
//             <th className="px-6 py-3 border-b text-gray-600 font-medium">Slug</th>
//             <th className="px-6 py-3 border-b text-gray-600 font-medium">Name</th>
//             <th className="px-6 py-3 border-b text-gray-600 font-medium">Image</th>
//           </tr>
//         </thead>
//         <tbody>
//           {!isLoading && !error && Array.isArray(Products) && (
//             Products.length > 0 ? (
//             Products.map((items) => (
//                 <tr key={items.id} className="border-b bg-white hover:bg-gray-50">
//                   <td className="px-6 py-3">{items.id}</td>
//                   <td className="px-6 py-3">{items.title}</td>
//                   <td className="px-6 py-3">{items.price}</td>
//                   <td className="px-6 py-3">{items.slug}</td>
//                   <td className="px-6 py-3">{items.category.name}</td>
//                   <td className="px-6 py-3"><img src={items.category.image} alt="" className='w-10' /></td>
//                 </tr>
//               ))
//             ) : (
//               <tr>

//               </tr>
//             )

//           )}
//         </tbody>

//       </table>
//     </div>
  
//   )
// }

// export default ProductApi;