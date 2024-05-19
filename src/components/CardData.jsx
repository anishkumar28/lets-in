import React, { useEffect, useState } from "react";
import { getDatabase, onValue, ref, remove } from "firebase/database";
import { app } from "../components/Firebase";




  const ContentList = () =>{

    const [cardData, setCardData] = useState(null)

    useEffect(() => {
      const db = getDatabase(app)
      const cardRef = ref(db,'users')
      onValue(cardRef,(snapshot)=>{
        const retrievedData = snapshot.val()
        console.log(retrievedData)
        setCardData(retrievedData)
      })
    },[])


  const deleteCard = (key) => {
    const db = getDatabase(app)
    const cardRef = ref(db,'users/cardData'+key)
    remove(cardRef)
  }

  return (
    <div>
        {cardData && (
          <div>
            {Object.entries(cardData).map(([key,value])=>{
                return(
                  <div key={key}>
                    <p>{value.companyName} {value.jobTitle} {value.link} {value.location} {value.status}  </p>
                    <button onClick={() => {deleteCard(key)}}>delete</button>
                  </div>
                )
              }
             )
            }
          </div>
         )
        }
    </div>
   )
}


export default ContentList;