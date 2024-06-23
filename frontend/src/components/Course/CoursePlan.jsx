import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "../../css/CoursePlan.module.css";
import tempData from "../../../../data/secondPageInput.json";
import { Sidebar } from "flowbite-react";
import { FaBookAtlas } from "react-icons/fa6";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiOutlineMinusSm,
  HiOutlinePlusSm,
  HiShoppingBag,
  HiTable,
  HiUser,
} from "react-icons/hi";
import { FaBookOpen } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

import FlashCard from "./FlashCard";
import QuizQuestion from "../Quiz/QuizQuestion";
import YouTube from "react-youtube";

function CoursePlan() {
  const location = useLocation("../../../data/");
  //   const { data } = location.state || {};
  const data = tempData;
  const [selectedSubTopic, setSelectedSubTopic] = useState(
    data?.[0]?.sub_topics?.[0] || null
  );
  const [selectedMainTopicIndex, setSelectedMainTopicIndex] = useState(0);
  const [activeSection, setActiveSection] = useState("course");
  const [expandedTopics, setExpandedTopics] = useState({});
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [activeSubTopic, setActiveSubTopic] = useState(
    data?.[0]?.sub_topics?.[0] || null
  );

  if (!data) {
    return <p>No data available</p>;
  }

  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(null);

  const handleSubTopicClick = (subTopic) => {
    setSelectedSubTopic(subTopic);
    setActiveSubTopic(subTopic);
    if (subTopic != "others") {
      setActiveSection("course");
    }
  };

  const handleSectionClick = (section, index) => {
    setActiveSection(section);
    console.log(index)
    setSelectedMainTopicIndex(index)
  };

  const handleNext = () => {
    setCurrentCardIndex(
      (prevIndex) =>
        (prevIndex + 1) % data[selectedMainTopicIndex].flash_cards.length
    );
  };

  const handlePrev = () => {
    setCurrentCardIndex(
      (prevIndex) =>
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
    return (
      <IconComponent
        className={twMerge(theme.label.icon.open[open ? "on" : "off"])}
      />
    );
  };

  const handleNextQuizQuestion = () => {
    setCurrentQuizIndex((prevIndex) => prevIndex + 1);
  };

  const handleQuizFinish = (score) => {
    setQuizScore(score);
  };

  return (
    <div className={styles.coursePlanContainer}>
      <Sidebar
        aria-label="Sidebar with multi-level dropdown"
        className={styles.sidebar}
      >
        <div className={styles.logoContainer}>
          <h1 className={styles.projectName}>iskul</h1>
          <hr/>
        </div>
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
                  {
                  
                  topic.sub_topics.map((subTopic, subIndex) => (
                    <Sidebar.Item
                      icon={FaBookOpen}
                      className={`${styles.sidebarItem} ${
                        activeSubTopic === subTopic ? styles.activeSubItem : ""
                      }`}
                      onClick={() => handleSubTopicClick(subTopic)}
                    >
                      {subTopic.sub_topic}
                    </Sidebar.Item>
                  ))}
                  <Sidebar.Item
                    icon={FaBookOpen}
                    className={`${styles.sidebarItem} ${
                        activeSection === "flashcard" && selectedMainTopicIndex === topicIndex
                          ? styles.activeSubItem
                          : ""
                      }`}
                    onClick={() => {
                      handleSubTopicClick("others");
                      handleSectionClick("flashcard", topicIndex);
                    }}
                  >
                    FlashCard
                  </Sidebar.Item>
                  <Sidebar.Item
                    icon={FaBookOpen}
                    className={`${styles.sidebarItem} ${
                        activeSection === "quiz" && selectedMainTopicIndex === topicIndex
                          ? styles.activeSubItem
                          : ""
                      }`}
                    onClick={() => {
                        handleSubTopicClick("others");
                      handleSectionClick("quiz", topicIndex);
                    }}
                  >
                    Quiz
                  </Sidebar.Item>
                </>
              </Sidebar.Collapse>
            ))}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>

      <div className={styles.mainContent}>
        {activeSection === "course" && selectedSubTopic && (
          <div className={styles.videoContainer}>
            <YouTube
              videoId={selectedSubTopic.url}
              className={styles.youtubePlayer}
            />
            <div className={styles.summary}>
              <h3>Summary</h3>
              <p>{selectedSubTopic.captions}</p>
            </div>
          </div>
        )}
        {activeSection === "flashcard" &&
          data[selectedMainTopicIndex].flash_cards && (
            <div>
              <h2>Flash Cards</h2>
              <div className={styles.flashCards}>
                <FlashCard
                  cardData={
                    data[selectedMainTopicIndex].flash_cards[currentCardIndex]
                  }
                ></FlashCard>
              </div>
              <div>
                <button className={styles.navButtons} onClick={handlePrev}>
                  Prev
                </button>
                <button className={styles.navButtons} onClick={handleNext}>
                  Next
                </button>
              </div>
            </div>
          )}
        {activeSection === "quiz" && data[selectedMainTopicIndex].quiz && (
          <div className={styles.quiz}>
            <h3>Quiz</h3>
            {currentQuizIndex < data[selectedMainTopicIndex].quiz.length ? (
              <QuizQuestion
                questionData={
                  data[selectedMainTopicIndex].quiz[currentQuizIndex]
                }
                onNext={handleNextQuizQuestion}
                totalQuestions={data[selectedMainTopicIndex].quiz.length}
                onQuizFinish={handleQuizFinish}
              />
            ) : (
              <div className={styles.quizScore}>
                <p>Quiz Completed!</p>
                <p>Your Score: {quizScore}%</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CoursePlan;
