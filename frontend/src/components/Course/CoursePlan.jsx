import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../../css/CoursePlan.module.css';
import tempData from '../../../../data/secondPageInput.json';
import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiOutlineMinusSm, HiOutlinePlusSm, HiShoppingBag, HiTable, HiUser } from 'react-icons/hi';
import { FaBookOpen } from "react-icons/fa"
import { twMerge } from 'tailwind-merge';

import FlashCard from './FlashCard';
function CoursePlan() {
  const location = useLocation('../../../data/');
  //   const { data } = location.state || {};
  const data = tempData;
  const [selectedSubTopic, setSelectedSubTopic] = useState(data?.[0]?.sub_topics?.[0] || null);
  const [selectedMainTopicIndex, setSelectedMainTopicIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('course');
  const [expandedTopics, setExpandedTopics] = useState({});
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  if (!data) {
    return <p>No data available</p>;
  }

  const handleSubTopicClick = (subTopic) => {
    setSelectedSubTopic(subTopic);
    setActiveSection('course');
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };
  const handleNext = () => {
    setCurrentCardIndex((prevIndex) =>
      (prevIndex + 1) % data[selectedMainTopicIndex].flash_cards.length
    );
  };

  const handlePrev = () => {
    setCurrentCardIndex((prevIndex) =>
      (prevIndex - 1 + data[selectedMainTopicIndex].flash_cards.length) %
      data[selectedMainTopicIndex].flash_cards.length
    );
  };

  const handleTopicClick = (index) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
    setSelectedMainTopicIndex(index);
  };

  const renderChevronIcon = (theme, open) => {
    const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;
    return <IconComponent className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />;
  };

  return (
    <div className={styles.coursePlanContainer}>
     <Sidebar aria-label="Sidebar with multi-level dropdown" className={styles.sidebar}>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {data.map((topic, topicIndex) => (
            <Sidebar.Collapse
              key={topicIndex}
              label={topic.main_topic}
              isOpen={expandedTopics[topicIndex]}
              onToggle={() => handleTopicToggle(topicIndex)}
              renderChevronIcon={renderChevronIcon}
              className={styles.SidebarCollapse}
            >
              <>
                {topic.sub_topics.map((subTopic, subIndex) => (
                  <Sidebar.Item 
                  icon={FaBookOpen}
                  className={styles.sidebarItem} onClick={() => handleSubTopicClick(subTopic)}>
                  {subTopic.sub_topic}
                </Sidebar.Item>
                ))}
                <Sidebar.Item 
                icon={FaBookOpen}
                onClick={() => handleSectionClick('flashcard')}>
                  FlashCard
                </Sidebar.Item>
                <Sidebar.Item 
                icon={FaBookOpen}
                onClick={() => handleSectionClick('quiz')}>
                  Quiz
                </Sidebar.Item>
              </>
            </Sidebar.Collapse>
          ))}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>

      <div className={styles.mainContent}>
        {activeSection === 'course' && selectedSubTopic && (
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
              <h3>Summary</h3>
              <p>{selectedSubTopic.captions}</p>
            </div>
          </div>
        )}
        {activeSection === 'flashcard' && data[selectedMainTopicIndex].flash_cards && (
          <div>
            <h2>Flash Cards</h2>
              <div className={styles.flashCards}>
                <FlashCard cardData={data[selectedMainTopicIndex].flash_cards[currentCardIndex]}></FlashCard>
              </div>
            <div>
              <button className={styles.navButtons} onClick={handlePrev}>Prev</button>
              <button className={styles.navButtons} onClick={handleNext}>Next</button>
            </div>
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
