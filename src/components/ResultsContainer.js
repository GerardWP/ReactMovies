import React from "react";

function ResultsContainer(props) {
  const target = props.targetID;
  const results = props.resRender;
  console.log("targs");
  console.log(target);

  return (
    <div id="resultContainer">
      <div>
        {results.map(res => {
          if (res.id === target) {
            return (
              <div key={res.id} id="target" className="resBox">
                <h1>{res.media_type === "movie" ? res.title : res.name}</h1>
                <h2>Main</h2>
                <span onClick={() => props.handler("MAYBE THIS WORKS")}>
                  click
                </span>
              </div>
            );
          } else return null;
        })}
      </div>
      <div id="relatedRes">
        {results.map(res => {
          if (res.id === target) {
            return null;
          } else {
            return (
              <div key={res.id} className="resBox">
                <h3>{res.media_type === "movie" ? res.title : res.name}</h3>
                <span onClick={() => props.handler("MAYBE THIS WORKS")}>
                  click
                </span>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default ResultsContainer;

// return (
//   <div id="resultContainer">
//     {props.results.length > 0
//       ? props.results.map(res => {
//           return (
//             <>
//               {res.id === target ? (
//                 <div key={res.id} id="target">
//                   <h1>{res.media_type === "movie" ? res.title : res.name}</h1>
//                   <h2>Main</h2>
//                   <span onClick={() => props.handler("MAYBE THIS WORKS")}>
//                     click
//                   </span>
//                 </div>
//               ) : (
//                 <div key={res.id}>
//                   <h3>{res.media_type === "movie" ? res.title : res.name}</h3>
//                   <span onClick={() => props.handler("MAYBE THIS WORKS")}>
//                     click
//                   </span>
//                 </div>
//               )}
//             </>
//           );
//         })
//       : null}
//   </div>
// );
