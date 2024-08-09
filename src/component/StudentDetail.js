// src/components/StudentDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';
function StudentDetail() {
  const {certificateId} = useParams();
  const [student, setStudent] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/students/${certificateId}`
        );
        setStudent(response.data);
        console.log(response.data)
        // console.log(id)
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudent();
  }, [certificateId]);

  if (!student) {
    return <div>Loading...</div>;
  }
  const StudentProfileContainer = styled.div`
    padding: 20px 0;
  `;

  const ProfileCard = styled.div`
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  `;

  const ProfileHeader = styled.div`
    background: transparent;
    text-align: center;
    padding: 20px;
  `;

  const ProfileImage = styled.img`
    width: 150px;
    height: 150px;
    object-fit: cover;
    margin: 10px auto;
    border: 10px solid #ccc;
    border-radius: 50%;
  `;

  const ProfileName = styled.h3`
    font-size: 20px;
    font-weight: 700;
  `;

  const ProfileBody = styled.div`
    padding: 20px;
  `;

  const ProfileInfo = styled.p`
    font-size: 16px;
    color: #000;
    margin-bottom: 10px;
  `;

  const InfoCard = styled.div`
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  `;

  const InfoCardHeader = styled.div`
    background: transparent;
    border-bottom: none;
    padding: 20px;
  `;

  const InfoCardTitle = styled.h3`
    margin-bottom: 0;
    font-size: 20px;
    font-weight: 700;
  `;

  const InfoCardBody = styled.div`
    padding: 20px;
  `;

  const InfoTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    color: #000;
  `;

  const InfoTableRow = styled.tr``;

  const InfoTableHeader = styled.th`
    font-size: 14px;
    padding: 5px 10px;
    text-align: left;
  `;

  const InfoTableData = styled.td`
    font-size: 14px;
    padding: 5px 10px;
  `;

  return (
    // <div>
    //   <h2>{student.name}</h2>
    //   <p>Course: {student.course}</p>
    //   <p>Certificate ID: {student.certificateId}</p>
    // </div>
    <>
       {/* <h2>{student.studentName}</h2>
       <p>Course: {student.course}</p>
       <p>Certificate ID: {student.certificateId}</p> */}
      <StudentProfileContainer>
        <div className="container">
          
          <div className="row">
            <div className="col-lg-4">
              <ProfileCard>
                <ProfileHeader>
                  <ProfileImage
                    src={`${apiUrl}/${student.imageUrl}`} alt={student.name}
                  />
                  <ProfileName>{student.studentName}</ProfileName>
                </ProfileHeader>
                <ProfileBody>
                  <ProfileInfo>
                    <strong>Student Certificate No.:{student.certificateNumber}</strong> {}
                  </ProfileInfo>
                </ProfileBody>
              </ProfileCard>
            </div>
            <div className="col-lg-8">
              <InfoCard>
                <InfoCardHeader>
                  <InfoCardTitle>General Information</InfoCardTitle>
                </InfoCardHeader>
                <InfoCardBody>
                  <InfoTable>
                    <tbody>
                      <InfoTableRow>
                        <InfoTableHeader width="30%"> Academic Year </InfoTableHeader>
                        <InfoTableData width="2%">:</InfoTableData>
                        <InfoTableData>{student.passingYear}</InfoTableData>
                      </InfoTableRow>
                      <InfoTableRow>
                        <InfoTableHeader width="30%">
                          Course Name
                        </InfoTableHeader>
                        <InfoTableData width="2%">:</InfoTableData>
                        <InfoTableData>{student.courseName}</InfoTableData>
                      </InfoTableRow>
                      <InfoTableRow>
                        <InfoTableHeader width="30%">Course Duration</InfoTableHeader>
                        <InfoTableData width="2%">:</InfoTableData>
                        <InfoTableData>{student.courseDuration}</InfoTableData>
                      </InfoTableRow>
                      <InfoTableRow>
                        <InfoTableHeader width="30%">Skills</InfoTableHeader>
                        <InfoTableData width="2%">:</InfoTableData>
                        <InfoTableData>{student.skills}</InfoTableData>
                      </InfoTableRow>
                    </tbody>
                  </InfoTable>
                </InfoCardBody>
              </InfoCard>
            </div>
          </div>
        </div>
      </StudentProfileContainer>
    </>
  );
}

export default StudentDetail;
