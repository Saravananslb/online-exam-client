import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addAnswers, getQuestions } from "../../apiCall";

export const Examination = () => {
  const [exams, setExams] = useState([]);
  const [viewQuestion, setViewQuestion] = useState(1);
  const navigate = useNavigate();
  const { examId } = useParams();
  let interval;
  let time = 0;
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    getExams();
    getTimer();
  }, []);

  const getTimer = () => {
    interval = setInterval(displayTimer, 1000);
  }

  const displayTimer = () => {
        time = time-1;
        setTimer(time)
        if (time <= 0) {
            clearInterval(interval);
            handleSubmit();
        }
  }

  const getExams = () => {
    getQuestions(examId).then((res) => {
      if (res.data.status) {
          setExams(res.data.questions);
          time = parseInt(res.data.questions.duration) * 60;
          setTimer(time)
          console.log(time)
        }
    });
  };

  const handleOptionChange = (cardId, optionId) => {
    const card = exams.questions.map((item) => {
      if (item.id === cardId) {
        if (item.type === "MULTIPLE_CHOICE") {
          item.answers = [optionId];
        } else {
          if (item.answers.includes(optionId)) {
            item.answers = item.filter((_item) => _item !== optionId);
          } else {
            item.answers = [...item.answers, optionId];
          }
        }
      }
      return item;
    });
    setExams({ ...exams, questions: card });
  };

  const handleSubmit = () => {
      addAnswers({examId, exams}).then(res => {
          console.log(res)
          navigate(`/Examination/${examId}/Result`)
      })
  }

  return (
    <>
      <div className="row" style={{ paddingTop: "70px" }}>
        <div className="col-2"></div>
        <div className="col-6">
          {exams.questions &&
            exams.questions.map((item) => (
                <>
              <div class="card row">
                  {item.id === viewQuestion ? 
                  <>
                <div class="card-header list-group-item-info">
                  {item.id}. {item.question}
                </div>
                <div class="card-body" style={{ padding: "10px" }}>
                  {item.option.map((_item) => (
                    <div
                      className={
                        item.answers.includes(_item.no) ? "option-selected" : ""
                      }
                      style={{ padding: "10px", cursor: "pointer" }}
                      onClick={() => handleOptionChange(item.id, _item.no)}
                    >
                      {_item.value}
                    </div>
                  ))}
                </div></> : null}
              </div>
              </>
            ))}
          <div className="row" style={{ padding: "10px" }}></div>
          <div className="row">
            <div className="col-2">
              <button className="btn-info" disabled={viewQuestion<=1} onClick={() => setViewQuestion(viewQuestion - 1)}>Previous</button>
            </div>
            <div className="col-8"></div>
            <div className="col-2">
              <button className="btn-info" onClick={() => setViewQuestion(viewQuestion + 1)}>Next</button>
            </div>
          </div>
        </div>
        <div className="col-3">
            <div className="row">
                <div className="col-4"></div>
                <div className="col" style={{fontSize: '50px'}}>
                {/* {timer.minutes} : {timer.seconds} {time} */}
                {timer}
                </div>
            </div>
          <div className="row">
            <div
              class="btn-toolbar"
              role="toolbar"
              aria-label="Toolbar with button groups"
            >
              {exams.questions &&
                exams.questions.map((item) => (
                  <div
                    class="btn-group me-2"
                    role="group"
                    aria-label="First group"
                  >
                    <button
                      type="button"
                      class="btn btn-info"
                      style={{
                        padding: "10px",
                        width: "50px",
                        marginLeft: "5px",
                      }}
                      onClick={() => setViewQuestion(item.id)}
                    >
                      {item.id}
                    </button>
                  </div>
                ))}
            </div>
          </div>
          <div className="row" style={{ marginTop: "10px" }}>
            <div className="col-3"></div>
            <div className="col-6">
              <button className="btn btn-success" style={{ width: "100px" }} onClick={handleSubmit}>
                Submit
              </button>
            </div>
            <div className="col-3"></div>
          </div>
        </div>
      </div>
    </>
  );
};
