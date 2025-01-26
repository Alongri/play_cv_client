import "../App.css";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { API_URL, doApiGet, doApiMethod } from "../services/apiService";

function ThisVideo() {
  let startAR = [
    {
      _id: "1",
      question: "When did you lead a team?",
      answer: "Pizza",
      index: 0,
      imageLink: "http://fakeimg.pl/300/?text=1",
    },
    {
      _id: "2",
      question: "Describe a challenging project you worked on.",
      answer: "Blue",
      index: 1,
      imageLink: "http://fakeimg.pl/300/?text=2",
    },
    {
      _id: "3",
      question: "What’s a proud moment in your career?",
      answer: "New York",
      index: 2,
      imageLink: "http://fakeimg.pl/300/?text=3",
    },
    {
      _id: "4",
      question: "Tell me about an event you participated in.",
      answer: "Pizza",
      index: 3,
      imageLink: "http://fakeimg.pl/300/?text=4",
    },
    {
      _id: "5",
      question: "Describe a difficult situation you managed.",
      answer: "Blue",
      index: 4,
      imageLink: "http://fakeimg.pl/300/?text=5",
    },
    {
      _id: "6",
      question: "Have you volunteered?",
      answer: "New York",
      index: 5,
      imageLink: "http://fakeimg.pl/300/?text=6",
    },
    {
      _id: "7",
      question: "What’s the most creative project you’ve done?",
      answer: "New York",
      index: 6,
      imageLink: "http://fakeimg.pl/300/?text=7",
    },
    {
      _id: "8",
      question: "When did you give a great presentation?",
      answer: "New York",
      index: 7,
      imageLink: "http://fakeimg.pl/300/?text=8",
    },
    {
      _id: "9",
      question: "What’s a photo of a challenge you overcame?",
      answer: "New York",
      index: 8,
      imageLink: "http://fakeimg.pl/300/?text=9",
    },
    {
      _id: "10",
      question: "Tell me about a team success.",
      answer: "New York",
      index: 9,
      imageLink: "http://fakeimg.pl/300/?text=10",
    },
    {
      _id: "11",
      question: "When did you step out of your comfort zone?",
      answer: "New York",
      index: 10,
      imageLink: "http://fakeimg.pl/300/?text=11",
    },
    {
      _id: "12",
      question: "Describe a professional achievement.",
      answer: "New York",
      index: 11,
      imageLink: "http://fakeimg.pl/300/?text=12",
    },
  ];
  const IdVideo = useSelector((state) => state.myDetailsSlice.idVideo);
  const [[activeIndex, direction], setActiveIndex] = useState([0, 0]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [items, setItems] = useState(startAR);

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    console.log(IdVideo);
    let url = API_URL + "/videos/childobjects/" + IdVideo;
    try {
      let data = await doApiGet(url);
      console.log(data);
      setItems(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (newDirection) => {
    setActiveIndex((prevIndex) => [prevIndex[0] + newDirection, newDirection]);
  };

  const indexInArrayScope =
    ((activeIndex % items.length) + items.length) % items.length;
  const visibleItems = [...items, ...items].slice(
    indexInArrayScope,
    indexInArrayScope + 3
  );

  return (
    <div className="main-wrapper">
      <div className="flex-container">
        <h1 className="emphesis-carousel">Edit before the magic</h1>
        {/* <button className="generate-btn quicksand">Generate</button> */}
      </div>
      <div className="wrapper">
        <AnimatePresence mode="popLayout" initial={false}>
          {visibleItems.map((item) => {
            const cardIndex = item.index + 1;
            return (
              <motion.div
                className="card"
                key={item._id}
                layout
                custom={{
                  direction,
                  position: () => {
                    if (item === visibleItems[0]) {
                      return "left";
                    } else if (item === visibleItems[1]) {
                      return "center";
                    } else {
                      return "right";
                    }
                  },
                }}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 1 }}
              >
                <div className="card-content">
                  <div>
                    <h5 className="card-index">
                      {cardIndex} of {items.length}
                    </h5>
                  </div>
                  <h3 className="faustina">{item.question}</h3>
                  <input
                    type="text"
                    value={item.answer}
                    className="styled-input"
                  />
                  <div className="image-container">
                    <img
                      src={item.imageLink}
                      alt="Card"
                      className="card-image"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      <div className="buttons">
        <motion.button
          className="prev-btn"
          whileTap={{ scale: 0.8 }}
          onClick={() => handleClick(-1)}
        >
          ◀︎
        </motion.button>
        <motion.button
          className="next-btn"
          whileTap={{ scale: 0.8 }}
          onClick={() => handleClick(1)}
        >
          ▶︎
        </motion.button>
      </div>
    </div>
  );
}

const variants = {
  enter: ({ direction }) => {
    return { scale: 0.2, x: direction < 1 ? 50 : -50, opacity: 0 };
  },
  center: ({ position, direction }) => {
    return {
      scale: position() === "center" ? 1 : 0.7,
      x: 0,
      zIndex: getZIndex({ position, direction }),
      opacity: 1,
    };
  },
  exit: ({ direction }) => {
    return { scale: 0.2, x: direction < 1 ? -50 : 50, opacity: 0 };
  },
};

function getZIndex({ position, direction }) {
  const indexes = {
    left: direction > 0 ? 2 : 1,
    center: 3,
    right: direction > 0 ? 1 : 2,
  };
  return indexes[position()];
}

export default ThisVideo;
