// src/components/QrScanner.js
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import axios from "axios";
import styled from 'styled-components'; // Add this line

function QrScanner() {
  const [data, setData] = useState(null);

  const handleScan = async (result) => {
    if (result) {
      try {
        const qrData = JSON.parse(result); // Parse the JSON data
        const response = await axios.get(
          `${process.env.REACT_API_URL}/api/students/${qrData.certificateId}`
        );
        setData({ ...response.data, name: qrData.name, course: qrData.course }); // Include name and course from QR code
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    }
  };
  const StudentProfile = styled.div`
    .card {
      border-radius: 10px;
    }

    .card .card-header .profile_img {
      width: 150px;
      height: 150px;
      object-fit: cover;
      margin: 10px auto;
      border: 10px solid #ccc;
      border-radius: 50%;
    }

    .card h3 {
      font-size: 20px;
      font-weight: 700;
    }

    .card p {
      font-size: 16px;
      color: #000;
    }

    .table th,
    .table td {
      font-size: 14px;
      padding: 5px 10px;
      color: #000;
    }
  `;

  return (
    <div>
      <QrReader
        onResult={(result, error) => {
          if (result) {
            handleScan(result.text);
          }
          if (error) {
            console.error("QR Reader error:", error);
          }
        }}
      />
      {data && (
        <div>
          <h2>{data.name}</h2>
          <p>{data.course}</p>
          <p>Certificate ID: {data.certificateId}</p>
        </div>
      )}

{data && (  <StudentProfile className="student-profile py-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="card shadow-sm">
                <div className="card-header bg-transparent text-center">
                  <img
                    className="profile_img"
                    src="https://placeimg.com/640/480/arch/any"
                    alt=""
                  />
                  <h3>Ishmam Ahasan Samin</h3>
                </div>
                <div className="card-body">
                  <p className="mb-0">
                    <strong className="pr-1">Student ID:</strong>321000001
                  </p>
                  <p className="mb-0">
                    <strong className="pr-1">Class:</strong>4
                  </p>
                  <p className="mb-0">
                    <strong className="pr-1">Section:</strong>A
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card shadow-sm">
                <div className="card-header bg-transparent border-0">
                  <h3 className="mb-0">
                    <i className="far fa-clone pr-1"></i>General Information
                  </h3>
                </div>
                <div className="card-body pt-0">
                  <table className="table table-bordered">
                    <tr>
                      <th width="30%">Roll</th>
                      <td width="2%">:</td>
                      <td>125</td>
                    </tr>
                    <tr>
                      <th width="30%">Academic Year</th>
                      <td width="2%">:</td>
                      <td>2020</td>
                    </tr>
                    <tr>
                      <th width="30%">Gender</th>
                      <td width="2%">:</td>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <th width="30%">Religion</th>
                      <td width="2%">:</td>
                      <td>Group</td>
                    </tr>
                    <tr>
                      <th width="30%">blood</th>
                      <td width="2%">:</td>
                      <td>B+</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </StudentProfile>
       )}

    </div>
  );
}

export default QrScanner;
