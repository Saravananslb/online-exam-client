import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { addQuestions } from "../../apiCall";

export const QuestionCard = (props) => {
  const [cards, setCards] = useState([
    {
      id: 1,
      type: "MULTIPLE_CHOICE",
      option: [
        {
          no: 1,
          value: "",
        },
      ],
      question: "",
      answers: [],
    },
  ]);

  const [exam, setExam] = useState({
    name: '',
    description: '',
    duration: 0
  })

  const navigate = useNavigate();

  const handleAddCard = () => {
    const card = [
      ...cards,
      {
        id: cards.length + 1,
        type: "MULTIPLE_CHOICE",
        option: [
          {
            no: 1,
            value: "",
          },
        ],
        question: "",
        answers: [],
      },
    ];
    setCards(card);
  };

  const deleteCard = (id) => {
    const newCards = cards.filter((item) => item.id !== id);
    const card = newCards.map((item, index) => {
      item.id = index + 1;
      return item;
    });
    setCards(card);
  };

  const handleAddOption = (id, e) => {
    const card = cards.map((item) => {
      if (item.id === id) {
        item.option = [
          ...item.option,
          { no: item.option.length + 1, value: "" },
        ];
      }
      return item;
    });
    setCards(card);
  };

  const handleRemoveOption = (cardId, optionId) => {
    const card = cards.map((item) => {
      if (item.id === cardId) {
        item.option = item.option.filter((_item) => _item.no !== optionId);
      }
      return item;
    });
    setCards(card);
  };

  const handleOptionChange = (cardId, optionId) => {
    const card = cards.map((item) => {
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
    setCards(card);
  };

  const changeType = (id, type) => {
    const card = cards.map((item) => {
      if (item.id === id) {
        item.type = type;
      }
      return item;
    });
    setCards(card);
  };

  const handleQuestionChange = (cardId, value) => {
    const card = cards.map((item) => {
      if (item.id === cardId) {
        item.question = value;
      }
      return item;
    });
    setCards(card);
  };

  const handleOptionValueChange = (cardId, optionId, value) => {
    const card = cards.map((item) => {
      if (item.id === cardId) {
        item.option = item.option.map((_item) => {
          if (_item.no === optionId) {
            _item.value = value;
          }
          return _item;
        });
      }
      return item;
    });
    setCards(card);
  };

  const handleSubmit = () => {
    addQuestions({exam, questions: cards}).then(res => {
      if (res.data) {
        navigate('/Examination')
      }
    })
  }

  return (
    <>
      <div className="container" style={{ paddingTop: "40px" }}>
        <div className="row">
          <div className="col-3"> </div>
          <div className="col-6">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Examination Name
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Examination name"
                value={exam.name}
                onChange={(e) => setExam({...exam, name: e.target.value})}
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Examination Description
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Examination Description"
                value={exam.description}
                onChange={(e) => setExam({...exam, description: e.target.value})}
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Examination Duration
              </label>
              <input
                type="number"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Examination Duration"
                value={exam.duration}
                onChange={(e) => setExam({...exam, duration: e.target.value})}
              />
            </div>
          </div>
        </div>
      </div>
      {cards.map((card) => (
        <div className="container" style={{ paddingTop: "40px" }}>
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6">
              <div
                className="card text-center"
                style={
                  card.id === "props.selectedCard"
                    ? { borderLeft: "5px solid #4285f4" }
                    : {}
                }
                // onClick={() => props.setSelectedCard(card.id)}
              >
                <div className="card-header"></div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-1" style={{ marginTop: "10px" }}>
                      {card.id}
                    </div>
                    <div className="col">
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Question"
                          aria-label="Question"
                          aria-describedby="basic-addon1"
                          style={{
                            paddingTop: "0.7rem",
                            paddingBottom: "0.7rem",
                          }}
                          value={card.question}
                          onChange={(e) =>
                            handleQuestionChange(card.id, e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  {card.option.map((item) => (
                    <div className="input-group mb-3 form-check row">
                      <div className="col-1">
                        <input
                          type={
                            card.type === "CHECK_BOXES" ? "checkbox" : "radio"
                          }
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                          value={""}
                          checked={card.answers.includes(item.no)}
                          readOnly
                          style={{
                            width: "20px",
                            height: "20px",
                            marginTop: "10px",
                          }}
                          onChange={(e) => handleOptionChange(card.id, item.no)}
                        />
                      </div>
                      <div className="col-10">
                        <input
                          type="text"
                          className="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-default"
                          placeholder="Enter the option"
                          value={item.value}
                          onChange={(e) =>
                            handleOptionValueChange(
                              card.id,
                              item.no,
                              e.target.value
                            )
                          }
                        />
                      </div>
                      {card.option.length > 1 ? (
                        <div
                          className="col"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleRemoveOption(card.id, item.no)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={"20px"}
                            height={"20"}
                            viewBox="0 0 320 512"
                          >
                            <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
                          </svg>
                        </div>
                      ) : null}
                    </div>
                  ))}
                  <div
                    className="input-group mb-3 form-check row"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => handleAddOption(card.id, e)}
                  >
                    Add Option
                  </div>
                </div>
                <div className="card-footer text-muted">
                  <div className="row">
                    <div className="col-8">
                      {/* <div className="col"> */}
                      <select
                        className="form-select form-select-lg mb-3"
                        aria-label=".form-select-lg example"
                        onChange={(e) => changeType(card.id, e.target.value)}
                      >
                        <option
                          value="MULTIPLE_CHOICE"
                          selected={card.type === "MULTIPLE_CHOICE"}
                        >
                          Multiple Choices
                        </option>
                        <option
                          value="CHECK_BOXES"
                          selected={card.type === "CHECK_BOXES"}
                        >
                          Check Boxes
                        </option>
                      </select>
                      {/* </div> */}
                    </div>
                    {cards.length > 1 ? (
                      <div
                        className="col"
                        style={{ cursor: "pointer" }}
                        onClick={() => deleteCard(card.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          width={"20"}
                          height={"20"}
                        >
                          <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z" />
                        </svg>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="row" style={{ marginTop: "10px" }}>
        <div className="col-4"></div>
        <div className="col-3">
          <button className="btn-info" onClick={handleAddCard}>
            Add Question
          </button>
        </div>
        <div className="col-4">
          <button className="btn-info" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};
