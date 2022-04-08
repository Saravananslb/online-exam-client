import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { getQuestions } from "../../apiCall";
import { useNavigate } from "react-router-dom";

export const MyExams = () => {
    const [exams, setExams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getExams();
    }, [])

    const getExams = () => {
        getQuestions("").then(res => {
            if (res.data.status)
            setExams(res.data.questions);
        })
    }

  return (
    <>
    <Header/>
      <div className="container" style={{paddingTop: '10px'}}>
        <div className="row">
          <div className="col-1"></div>
          {exams.map(item => 
          <div className="col-3">
            <div class="card">
              <div class="card-header">{item.name}</div>
              <div class="card-body">
                <h5 class="card-title">{item.description}</h5>
                <p class="card-text">
                  Duration {item.duration} mins {item.isCompleted ? ` - Completed` : null}
                </p>
                {item.isCompleted ? 
                <a onClick={() => navigate(`/Examination/${item._id}/Result`)} class="btn btn-primary">
                    View Results
                </a> : 
                <a onClick={() => navigate(`/Examination/${item._id}`)} class="btn btn-primary">
                  Take a Exam
                </a>}
              </div>
            </div>
          </div>)}
          <div className="col-2"></div>
        </div>
      </div>
    </>
  );
};
