import {
  Box,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Accordion,
} from "@mui/material";
import { useState } from "react";
import { faqs } from "../../Constant";
import "./Styles/FaqSection.css";
import plusIcon from "../../Icons/plus.svg";
import expandMoreImg from "../../Icons/collapse.svg";
import { motion } from "framer-motion";
import useInView from "./useInView.jsx";

const FaqSection = () => {
  const [expanded, setExpanded] = useState();
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [ref, inView] = useInView({ threshold: 0.5 });

  return (
    <>
      <Box
        id="faqs"
        sx={{
          background: "#FFF",
          width: "100%",
          height: "auto",
          p: "5% 0px",
          position: "relative",
        }}
        ref={ref}
      >
        <Box
          className="faqMainContainer"
          sx={{
            width: "85%",
            m: "auto",
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <motion.div
            className="faqHeadinBox"
            initial={{ x: -500, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: -500, opacity: 0 }}
            transition={{ duration: 0.9 }}
            style={{ width: "10%" }}
          >
            <Typography className="faq-heading" fontSize={"75px"}>
              F
            </Typography>
            <Typography className="faq-heading" fontSize={"75px"}>
              A
            </Typography>
            <Typography className="faq-heading" fontSize={"75px"}>
              Q
            </Typography>
            <Typography className="faq-heading" fontSize={"75px"}>
              s
            </Typography>
          </motion.div>
          <motion.div
            className="faqText"
            initial={{ x: -500, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: -500, opacity: 0 }}
            transition={{ duration: 0.9 }}
          >
            <Typography className="faqText-heading" fontSize={"50px"}>
              FAQs
            </Typography>
          </motion.div>

          <Box
            className="faqContainer"
            sx={{
              width: "90%",
            }}
          >
            <Box>
              {faqs &&
                faqs?.map((item, index) => (
                  <Box
                    sx={{
                      overflow: "hidden",
                      borderRadius: expanded === item.id ? "15px" : "15px",
                      mt: 2,
                    }}
                  >
                    <Accordion
                      disableGutters
                      expanded={expanded === item.id}
                      onChange={handleChange(item.id)}
                      className="accordion"
                      sx={{
                        p: 2,
                        background:
                          expanded === item.id ? "#D9E99D" : "#FCFCFC",
                        borderRadius: expanded === item.id ? "15px" : "15px",
                      }}
                    >
                      <AccordionSummary
                        expandIcon={
                          expanded === item.id ? (
                            <img
                              style={{ width: "32px", height: "32px" }}
                              src={expandMoreImg}
                              alt="ExpandLess"
                              className="expandLess"
                            />
                          ) : (
                            <img
                              style={{ width: "32px", height: "32px" }}
                              src={plusIcon}
                              alt="ExpandMore"
                              className="expandMore"
                            />
                          )
                        }
                        aria-controls={`panel${item.id}-content`}
                        id={`panel${item.id}-header`}
                        sx={{
                          fontSize: "18px",
                          display: "flex",
                          gap: "10px",
                        }}
                        className={
                          expanded === item.id ? "faqTitle" : "faq-title"
                        }
                      >
                        {item.title}
                      </AccordionSummary>
                      <AccordionDetails
                        className="faqDescText"
                        sx={{
                          fontSize: "18px",
                          fontWeight: 500,
                          color: "#2E2D2D",
                        }}
                      >
                        {item.description}
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default FaqSection;
