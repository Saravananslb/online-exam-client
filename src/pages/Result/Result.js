import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addQuestions, getResults } from "../../apiCall";

export const Result = () => {
  const [cards, setCards] = useState([]);

  const [exam, setExam] = useState({
  });

  const { examId } = useParams();

  useEffect(() => {
    getResults(examId).then(res => {
        if (res.data.status) {
            setCards(res.data.answers[0].questions);
            setExam(res.data.answers[0]);
        }
    })
  }, [examId])

  return (
    <>
      <div className="container" style={{ paddingTop: "40px" }}>
        <div className="row">
          <div className="col-3"> </div>
          <div className="col-6">
            <div className="row">
                <h1 style={{textAlign: 'center'}}>Results</h1>
            </div>
            <div className="row">
                <h1>Points: {exam.points}</h1>
            </div>
          </div>
        </div>
      </div>
      {cards.map((item) => (
        <div className="container" style={{ paddingTop: "40px" }}>
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6">
              <div
                className="card text-center"
                style={
                  item.id === "props.selectedCard"
                    ? { borderLeft: "5px solid #4285f4" }
                    : {}
                }
                // onClick={() => props.setSelectedCard(card.id)}
              >
                <>
                <div class="card-header list-group-item-info">
                  {item.id}. {item.question}
                </div>
                <div class="card-body" style={{ padding: "10px" }}>
                  {item.option.map((_item) => (
                    <div
                      className={
                        item.answers.includes(_item.no) && item.isCorrect ? "option-selected" : item.answers.includes(_item.no) && !item.isCorrect ? "incorrect-selected" : ""
                      }
                      style={{ padding: "10px", cursor: "pointer" }}
                      
                    >
                      {_item.value}
                    </div>
                  ))}
                </div></>
                 
                
              </div>
            </div>
          </div>
        </div>
      ))}
      
    </>
  );
};
