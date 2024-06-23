import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import styles from "../../css/CoursePlan.module.css";
import tempData from "../../../../data/secondPageInput.json";

function CoursePlan() {
  const location = useLocation("../../../data/");
  //   const { data } = location.state || {};
  const data = tempData;
  const [selectedSubTopic, setSelectedSubTopic] = useState(
    data?.[0]?.sub_topics?.[0] || null
  );
  const [selectedMainTopicIndex, setSelectedMainTopicIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('course');


  if (!data) {
    return <p>No data available</p>;
  }

  const handleSubTopicClick = (subTopic) => {
    setSelectedSubTopic(subTopic);
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className={styles.coursePlanContainer}>
        
        <div className={styles.sidebar}>
        {data.map((topic, topicIndex) => (
            
          <div key={topicIndex}>
            <h2>{topic.main_topic}</h2>
            <ul>
              {topic.sub_topics.map((subTopic, index) => (
                <li key={index} onClick={() => handleSubTopicClick(subTopic)}>
                  {subTopic.sub_topic}
                </li>
              ))}
              <li onClick={() => handleSectionClick('flashcard')}>FlashCard</li>
              <li onClick={() => handleSectionClick('quiz')}>Quiz</li>
            </ul>
            
          </div>
        ))}
        </div>
      <div className={styles.mainContent}>
        {activeSection == "course" && selectedSubTopic && (
          <div className={styles.videoContainer}>
            <iframe
              width="100%"
              height="400"
              src={selectedSubTopic.url}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Course Video"
            ></iframe>
            <div className={styles.summary}>
              <h3>Captions</h3>
              <p>{selectedSubTopic.captions}</p>
            </div>
          </div>
        )}
        {activeSection === 'flashcard' && data[selectedMainTopicIndex].flash_cards && (
          <div className={styles.flashCards}>
            <h3>Flash Cards</h3>
            {data[selectedMainTopicIndex].flash_cards.map((card, index) => (
              <div key={index} className={styles.flashCard}>
                <p>{card.content}</p>
              </div>
            ))}
          </div>
        )}
        {activeSection === 'quiz' && data[selectedMainTopicIndex].quiz && (
          <div className={styles.quiz}>
            <h3>Quiz</h3>
            {data[selectedMainTopicIndex].quiz.map((q, index) => {
              const questionKey = Object.keys(q)[0];
              const questionData = q[questionKey];
              return (
                <div key={index} className={styles.quizQuestion}>
                  <p>{questionData.question}</p>
                  <ul>
                    <li>{questionData.option1}</li>
                    <li>{questionData.option2}</li>
                    <li>{questionData.option3}</li>
                    <li>{questionData.option4}</li>
                  </ul>
                  <p>Correct Answer: {questionData.correct_response}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default CoursePlan;
