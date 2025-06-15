import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    padding: 40,
    lineHeight: 1.4,
    color: "#222",
    backgroundColor: "#FAFAFA",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
    textAlign: "center",
    color: "#2c3e50",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  subheader: {
    fontSize: 10,
    textAlign: "center",
    marginBottom: 16,
    color: "#7f8c8d",
  },
  duration: {
    fontSize: 10,
    marginBottom: 18,
    textAlign: "center",
    color: "#555",
    fontStyle: "italic",
  },
  questionBlock: {
    marginBottom: 16,
    padding: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  questionText: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#34495e",
  },
  optionText: {
    fontSize: 10,
    paddingLeft: 8,
    marginBottom: 3,
    color: "#2d3436",
  },
  optionBullet: {
    fontWeight: "bold",
    marginRight: 4,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 9,
    color: "#aaa",
  },
});

type Quiz = {
  name: string;
  start_time: string;
  end_time: string;
  questions: {
    id: number;
    text: string;
    option_1: string;
    option_2: string;
    option_3: string;
    option_4: string;
  }[];
};

interface QuizPdfProps {
  quiz: Quiz;
}

const formatDuration = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffMs = endDate.getTime() - startDate.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(diffSeconds / 60);
  const seconds = diffSeconds % 60;
  return `${minutes} min${minutes !== 1 ? "s" : ""} ${seconds} sec${
    seconds !== 1 ? "s" : ""
  }`;
};

export const QuizPdfDocument: React.FC<QuizPdfProps> = ({ quiz }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Quiz Header */}
        <Text style={styles.header}>{quiz.name}</Text>
        <Text style={styles.subheader}>Quiz Assessment</Text>
        <Text style={styles.duration}>
          Duration: {formatDuration(quiz.start_time, quiz.end_time)}
        </Text>

        {/* Questions */}
        {quiz.questions.map((q, idx) => (
          <View key={q.id} style={styles.questionBlock}>
            <Text style={styles.questionText}>
              {idx + 1}. {q.text}
            </Text>
            <Text style={styles.optionText}>
              <Text style={styles.optionBullet}>A.</Text> {q.option_1}
            </Text>
            <Text style={styles.optionText}>
              <Text style={styles.optionBullet}>B.</Text> {q.option_2}
            </Text>
            <Text style={styles.optionText}>
              <Text style={styles.optionBullet}>C.</Text> {q.option_3}
            </Text>
            <Text style={styles.optionText}>
              <Text style={styles.optionBullet}>D.</Text> {q.option_4}
            </Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};
