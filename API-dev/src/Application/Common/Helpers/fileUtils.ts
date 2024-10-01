import { StatusCodeEnums } from './../../../Domain/Enums/StatusCodeEnums';
import { CoreException } from './../Exceptions/CoreException';
export async function parseGiftFile(filePath: string) {
  const results: any = [];
  try {
    if (typeof filePath !== 'string') {
      throw new CoreException(StatusCodeEnums.InternalServerError_500, 'File path must be a string');
    }
    // Regex to match question blocks
    const questionRegex = /\/\/\s*question:\s*(\d+)\s*name:\s*([A-Z]{3}\d+\w*)\s*([\s\S]*?)\s*{([\s\S]*?)}/g;
    let match;
    while ((match = questionRegex.exec(filePath)) !== null) {
      const questionId = match[1];
      const name = match[2];
      const questionTopicTemp = match[3].replaceAll(/\t/g, "").trim();
      const questionTopic = questionTopicTemp.slice(questionTopicTemp.indexOf("[html]<p>") + "[html]<p>".length, questionTopicTemp.indexOf("</p>"));
      const questionDescriptionTemp = match[4].replaceAll(/\t/g, "").trim();
      // const questionDescription = questionText.slice(questionText.indexOf("</p>{") + "</p>{".length, questionText.length);
      const regexPattern = /<p>|<\/p>|=|~/g;
      const questionDescription = questionDescriptionTemp.replaceAll(regexPattern, "")
      const answerTemp = match[4]
   
      let answer;
      if (questionDescriptionTemp.toLocaleLowerCase().trim() === "false" || questionDescriptionTemp.toLocaleLowerCase().trim() === "true") {
        
        answer = [questionDescriptionTemp];
      } else {
        // const correctAnswerRegex = /=(<p>.*?<\/p>)/;
        // const answerMatch = questionDescriptionTemp.match(correctAnswerRegex);
        // answer = answerMatch ? answerMatch[1].replaceAll(regexPattern, "") : null;
        const correctAnswerRegex = /=(<p>([^]*?)<\/p>)/g
        const regexPatternForAnswer = /=<p>|<\/p>|~/g;
        const answerMatches = questionDescriptionTemp.match(correctAnswerRegex);
        const answers = answerMatches ? answerMatches.map(match => match.trim().replaceAll(regexPatternForAnswer, "")) : []; 
        answer = answers.length > 0 ? answers : null;
      }
      if (questionId != '0') {
        results.push({ name, questionTopic, questionDescription, answer });
      }
    }
  } catch (error: any) {
    throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
  }

  
  return results;
}
