import axios from 'axios';

export interface TriviaQuestion {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export async function fetchQuestions(amount = 5): Promise<TriviaQuestion[]> {
    const res = await axios.get(`https://opentdb.com/api.php?amount=${amount}&type=multiple`);
    return res.data.results;
}