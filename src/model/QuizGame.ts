export interface Question {
    id: number
    question: string
    difficulty: string
    category: string
    correctAnswer: string
    incorrectAnswers: string[]
    options: string[]
    correctIndex: number
}


export interface QuizGame {
    roomId: string
    gameId:string
    currentQuestion: Question | null
    scores: Score[]
    finished: boolean
    participants: string[]
    currentQuestionIndex: number
    questions: Question[]
}

export interface Score {
    player: string
    score: number
}
