export interface QuestionDTO {
    id: number
    question: string
    difficulty: string
    category: string
    categoryId: string
    correctAnswer: string
    incorrectAnswers: string[]
    options: string[]
    correctIndex: number
}

export interface ParticipantDTO {
    participantId: string
    username: string
    delaiReponse: number
    tempId: string
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
    waitingForNext?: boolean
}

export interface ScoreDTO {
    player: string
    score: number
}
