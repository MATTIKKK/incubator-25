from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class UserBase(BaseModel):
    email: str
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class CategoryBase(BaseModel):
    name: str

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int
    
    class Config:
        from_attributes = True

class IdeaBase(BaseModel):
    title: str
    description: str
    category_id: int

class IdeaCreate(IdeaBase):
    pass

class Idea(IdeaBase):
    id: int
    created_at: datetime
    author_id: int
    author: User
    category: Category
    
    class Config:
        from_attributes = True
