export interface Role {
        id: number
        name: string
        users: User[]
        createdAt: Date
        updatedAt: Date
}

export interface User {
        id: number
        email: String
        firstname: String
        lastname: String
        password: String
        pseudo: String
        urlProfilImage: String
        note: number
        createdAt: Date
        updatedAt: Date
        role: Role
        roleId: String
        createdCours: ICours[]
        badges: UserHasBadge[]
        enrollments: UserHasCours[]
        activations: CoursActived[]
        commentaires: Comment[]
        opinions: Opinion[]
        notifications: Notification[]
}

export interface ICours {
        id: Number
        slug:string
        title: String
        littleSummary: String
        urlImage: String
        difficulty: number
        summary: String
        visibility: Boolean
        createdAt: Date
        updatedAt: Date
        author: User
        authorId: Number
        category: Category
        categoryId: Number
        numberPage:number
        tools: CoursHasTool[]
        learningObjectives: CoursHasLearningObjective[]
        content: CourContent[]
        enrollments: UserHasCours[]
        activations: CoursActived[]
        comments: Comment[]
        opinions: Opinion[]
        notifications: Notification[]
}
export interface CourContent {
        id: Number
        coursId: Number
        numberPage: Number
        content: String
        createdAt: Date
        updatedAt: Date
        cours: ICours
}

export interface Category {
        id: Number
        name: String
        description: String
        textColor: String
        borderColor: String
        createdAt: Date
        updatedAt: Date
        courses: ICours[]
}

export interface LearningObjective {
        id: Number
        title: String
        description: String
        createdAt: Date
        updatedAt: Date
        courses: CoursHasLearningObjective[]
}

export interface Tool {
        id: Number
        name: String
        description: String
        createdAt: Date
        updatedAt: Date
        cours: CoursHasTool[]
}
export interface Badge {
        id: Number
        name: String
        description: String
        createdAt: Date
        updatedAt: Date
        users: UserHasBadge[]
}

export interface UserHasCours {
        id: Number
        userId: Number
        coursId: Number
        createdAt: Date
        updatedAt: Date
        user: User
        cours: ICours
}

export interface CoursActived {
        id: Number
        userId: Number
        coursId: Number
        IsEnd: Boolean
        createdAt: Date
        updatedAt: Date
        user: User
        cours: ICours
}
export interface UserHasBadge {
        id: Number
        userId: Number
        badgeId: Number
        createdAt: Date
        updatedAt: Date
        user: User
        badge: Badge
}
export interface CoursHasTool {
        id: Number
        coursId: Number
        toolsId: Number
        createdAt: Date
        updatedAt: Date
        cours: ICours
        tools: Tool
}
export interface CoursHasLearningObjective {
        id: Number
        coursId: Number
        learningObjectiveId: Number
        createdAt: Date
        updatedAt: Date
        cours: ICours
        objectif: LearningObjective
}

export interface Comment {
        id: Number
        description: String
        coursId: Number
        authorId: Number
        createdAt: Date
        updatedAt: Date
        cours: ICours
        auteur: User
}
export interface Opinion {
  id :number
  content: string
  note  :  number
  coursId: number    
  userId  :number    
  createdAt :Date
  updatedAt :Date
  cours :ICours 
  user : User  
}

export interface Notification {
   id :Number
  contenu :String
  coursId  :Number
  userId  :Number
  createdAt :Date
  updatedAt :Date
  cours :ICours
  user : User
}
