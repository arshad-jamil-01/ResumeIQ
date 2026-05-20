// const formatInterviewReport = (ai) => {
//   return {
//     matchScore: ai.match_score,

//     technicalQuestion: ai.technical_interview_questions.map(q => ({
//       question: q,
//       intention: "",
//       answer: ""
//     })),

//     behavioralQuestion: ai.behavioral_interview_questions.map(q => ({
//       question: q,
//       intention: "",
//       answer: ""
//     })),

//     skillGaps: ai.skill_gaps.map(s => ({
//       skill: s,
//       severity: "low"
//     })),

//     preparationPlan: ai.preparation_plan.map((p, i) => ({
//       day: i + 1,
//       focus: p,
//       task: []
//     }))
//   };
// };

// export default formatInterviewReport;




// const formatInterviewReport = (ai) => {
//   return {
//     matchScore: ai.match_score,

//     technicalQuestion: ai.technical_interview_questions.map(q => ({
//       question: q.question,
//       intention: q.intention,
//       answer: q.answer
//     })),

//     behavioralQuestion: ai.behavioral_interview_questions.map(q => ({
//       question: q.question,
//       intention: q.intention,
//       answer: q.answer
//     })),

//     skillGaps: ai.skill_gaps.map(s => ({
//       skill: s.skill,
//       severity: s.severity
//     })),

//     preparationPlan: ai.preparation_plan.map(p => ({
//       day: p.day,
//       focus: p.focus,
//       task: p.task || []
//     }))
//   };
// };

// export default formatInterviewReport;




const formatInterviewReport = (ai) => {

  return {
    matchScore: ai.match_score || 0,

    // ====== TECHNICAL QUESTIONS =======
    technicalQuestion: ai.technical_interview_questions
      .filter(q => q)
      .map(q => {

        const parsedQuestion =
          typeof q === "string" ? JSON.parse(q) : q;

        return {
          question: parsedQuestion.question || "",
          intention: parsedQuestion.intention || "",
          answer: parsedQuestion.answer || ""
        };
      }),

    // ====== BEHAVIORAL QUESTIONS =====
    behavioralQuestion: ai.behavioral_interview_questions
      .filter(q => q)
      .map(q => {

        const parsedQuestion =
          typeof q === "string" ? JSON.parse(q) : q;

        return {
          question: parsedQuestion.question || "",
          intention: parsedQuestion.intention || "",
          answer: parsedQuestion.answer || ""
        };
      }),

    // ======= SKILL GAPS =====
    skillGaps: ai.skill_gaps
      .filter(s => s)
      .map(s => {

        const parsedSkill =
          typeof s === "string" ? JSON.parse(s) : s;

        return {
          skill: parsedSkill.skill || "",
          severity: parsedSkill.severity || "low"
        };
      }),

    //====== PREPARATION PLAN ======
    preparationPlan: ai.preparation_plan
      .filter(p => p)
      .map(p => {

        let parsedPlan;

        if (typeof p === "string") {

          const cleanString = p
            .replace(/,$/, "")
            .replace(/`/g, "");

          parsedPlan = JSON.parse(cleanString);

        } else {
          parsedPlan = p;
        }

        return {
          day: parsedPlan.day || 1,
          focus: parsedPlan.focus || "",
          task: parsedPlan.task || []
        };
      })
  };
};

export default formatInterviewReport;