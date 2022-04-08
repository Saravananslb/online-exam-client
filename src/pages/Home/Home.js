import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import "./Home.css";

export const Home = () => {
    const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="container" style={{ paddingTop: "10px" }}>
        <div className="row">
          <div className="col-3">
            <div class="card">
              <div class="card-header container-home">Important Links</div>
              <div class="card-body">
                <ul class="list-group">
                  <li class="list-group-item links" onClick={() => navigate('/StudentRegistration')}>New Registration</li>
                  <li class="list-group-item links" onClick={() => navigate('/StudentLogin')}>Applicant Login</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div class="card">
              <div class="card-header container-home-main">Guidelines</div>
              <div class="card-body">
                <ol id="ol_Eng">
                  <li>
                    Candidates must obtain the dates of examination from the
                    latest date sheet uploaded on the University website i.e.{" "}
                    
                    <br />
                    <br />
                  </li>
                  <li>
                    Candidates must keep with them the following documents on
                    the day of examination:
                    <br />
                    <br />
                    <ol type="i">
                      <li>
                        Any one of the authorized photo IDs (Must be original,
                        valid and non expired) – PAN Card / Driving License /
                        Voter ID / Passport / Aadhaar Card.
                        <br />
                        <br />
                      </li>
                    </ol>
                  </li>
                  <li>
                    Read the guidelines and instructions carefully and Login 30
                    minutes before the exam.
                    <br />
                    <br />
                  </li>
                  <li>
                    University will conduct subjective type (Theoritical) exam:
                    <br />
                    <br />
                    <b>Subjective Type</b> – In this type of examination. The
                    process is same as University routine written exam. Only
                    difference is that students will give this exam at home and
                    capture all the filled answer book’s page and upload.
                    <br />
                    <br />
                  </li>
                  <li>
                    <h3>Do's</h3>
                    <ol type="i">
                      <li>
                        Photograph clicked must be of good quality
                        <br />
                        <br />
                      </li>
                      <li>
                        You have to make sure that your laptop / desktop have
                        proper charge, power backup and proper Internet
                        connectivity. Power point available in the room must be
                        functional. Make sure that your system's webcam and
                        speakers are working properly.
                        <br />
                        <br />
                      </li>
                      <li>
                        Online exams are strictly monitored and are recorded.
                        Candidates must ensure that their webcam Device and
                        speaker should be in On-mode throughout the entire
                        examination.
                        <br />
                        <br />
                      </li>
                      <li>
                        You should keep your mobile phone in the silent mode.
                        Switch off all notifications like SMS, Whatsapp etc. on
                        your mobile phone.
                        <br />
                        <br />
                      </li>
                    </ol>
                  </li>
                  <li>
                    <h3>Don't</h3>
                    <ol type="i">
                      <li>
                        Do not try to move away from the main screen. Doing so
                        will automatically terminate your exam.
                        <br />
                        <br />
                      </li>
                      <li>
                        You are not allowed to talk to anyone while your exam is
                        being conducted, as Real Time Monitoring is being done
                        by software. Doing so will automatically terminate your
                        exam.
                        <br />
                        <br />
                      </li>
                      <li>
                        Do not try to cover your camera or unplug the external
                        camera from the system.
                        <br />
                        <br />
                      </li>
                      <li>
                        You are not allowed to start the test from multiple
                        devices at a time. Doing so will automatically terminate
                        your exam.
                        <br />
                        <br />
                      </li>
                      <li>
                        You must not use headphones, ear buds or any other type
                        of hearing equipment.
                        <br />
                        <br />
                      </li>
                      <li>
                        Do not open any other application on your laptop or
                        mobile while attempting the question paper.
                        <br />
                        <br />
                      </li>
                      <li>
                        The Candidate shall not mention his / her mobile
                        number/(s) on the answer sheet. Doing so will
                        automatically terminate your exam.
                        <br />
                        <br />
                      </li>
                    </ol>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
