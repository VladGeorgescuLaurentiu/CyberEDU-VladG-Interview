interface Review {
    id: number;
    rating: number;
    difficulty: number;
    title: string | null;
    description: string | null;
  }
  
  interface Author {
    id: string;
    name: string;
    name_acronym: string;
    country: string;
    roles: string[];
    type: string;
    trashed: boolean;
    created_at: {
      date: string;
      timestamp: number;
      for_humans: string;
    };
  }
  
  interface Tag {
    id: number;
    name: string;
    type: string;
  }
  
  interface Attempt {
    points: string;
    user: {
      id: string;
      name: string;
      name_acronym: string;
      country: string;
      roles: string[];
      type: string;
      trashed: boolean;
      created_at: {
        date: string;
        timestamp: number;
        for_humans: string;
      };
    };
    created_at: {
      date: string;
      timestamp: number;
      for_humans: string;
    };
  }
  
  interface Counts {
    attempts: number;
    owned: number;
    review_score: string;
  }
  
  interface CreatedAt {
    date: string;
    timestamp: number;
    for_humans: string;
  }
  
  interface UpdatedAt {
    date: string;
    timestamp: number;
    for_humans: string;
  }
  
  export default class ChallengeDTO {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    difficulty_score: number;
    points: string;
    type: string;
    section: string | null;
    is_subscribed: boolean;
    is_owned: boolean;
    status: string;
    reviewed: boolean;
    review: Review;
    author: Author;
    tags: Tag[];
    uniqueTagType:string[];
    uniqueTagNames:string[];
    counts: Counts;
    attempts: Attempt[];
    podium_attempts: any[]; // Type could be more specific if available
    created_at: CreatedAt;
    updated_at: UpdatedAt;
  
    constructor(data: any) {
      this.id = data.id;
      this.title = data.title;
      this.description = data.description;
      this.difficulty = data.difficulty;
      this.difficulty_score = data.difficulty_score;
      this.points = data.points;
      this.type = data.type;
      this.section = data.section;
      this.is_subscribed = data.is_subscribed;
      this.is_owned = data.is_owned;
      this.status = data.status;
      this.reviewed = data.reviewed;
      this.review = data.review;
      this.author = data.author;
      this.tags = data.tags;
      this.uniqueTagType = data.uniqueTagType;
      this.uniqueTagNames = data.uniqueTagNames;
      this.counts = data.counts;
      this.attempts = data.attempts;
      this.podium_attempts = data.podium_attempts;
      this.created_at = data.created_at;
      this.updated_at = data.updated_at;
    }
  }
  