export interface QuestionDTO {
    id: number
    question: string
    difficulty: string
    category: string
    correctAnswer: string
    incorrectAnswers: string[]
    options: string[]
    correctIndex: number
}

export interface ParticipantDTO {
    participantId: string
    username: string
    delaiReponse: number
}


export interface QuizGameDTO {
    roomId: string
    gameId:string
    currentQuestion: QuestionDTO | null
    scores: ScoreDTO[]
    finished: boolean
    participants: ParticipantDTO[]
    currentQuestionIndex: number
    questions: QuestionDTO[]
    messageSystem?: string
}

export interface ScoreDTO {
    player: string
    score: number
}
