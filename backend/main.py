from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os

app = FastAPI(title="GenPath AI API")

# Configure CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Models for Input ---

class DomainInput(BaseModel):
    name: str
    level: str  # Beginner, Intermediate, Advanced
    score: int  # 0-100
    notes: Optional[str] = ""

class GeneratePathRequest(BaseModel):
    goal: str
    domains: List[DomainInput]

# --- Pydantic Models for Output (Matching User Schema) ---

class ModuleOutput(BaseModel):
    title: str
    type: str
    duration: str
    url: str
    outcome: str

class DomainOutput(BaseModel):
    domain_id: str
    domain_title: str
    slug: str
    level: str
    summary: str
    priority: str
    learning_path_title: str
    modules: List[ModuleOutput]
    call_to_action: str

# --- API Endpoints ---

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "version": "1.0"}

@app.post("/api/learning-path/generate", response_model=List[DomainOutput])
async def generate_learning_path(request: GeneratePathRequest):
    """
    Simulates calling an LLM (like OpenAI) using the strict JSON schema prompt
    provided by the user to return a list of concrete learning modules.
    For now, returns mock JSON matching the exact schema requirements until API keys are wired.
    """
    
    # In a real implementation:
    # 1. Build the prompt with request.domains
    # 2. Call OpenAI with `response_format={ "type": "json_object" }`
    # 3. Parse LLM response to `List[DomainOutput]`
    
    response_data = []
    
    for domain in request.domains:
        # Example logic mapping based on user prompt rules
        priority = "High" if domain.score < 40 else "Medium"
        num_modules = 5 if domain.level == "Beginner" or domain.score < 40 else 3
        
        domain_item = DomainOutput(
            domain_id=domain.name.lower().replace(" ", "_").replace("&", "and"),
            domain_title=domain.name,
            slug=domain.name.lower().replace(" ", "-").replace("&", "and"),
            level=domain.level,
            summary=f"You will build a solid foundation in {domain.name} to close the knowledge gaps identified in your assessment.",
            priority=priority,
            learning_path_title=f"{domain.name} Mastery",
            modules=[
                ModuleOutput(
                    title=f"Intro to {domain.name} Concepts",
                    type="video",
                    duration="25 min",
                    url=f"/learning/{domain.name.lower().replace(' ', '-')}/intro",
                    outcome=f"You will be able to explain the core principles of {domain.name}."
                )
                for i in range(num_modules) 
                # ^ Just generating dummy modules up to the required count (3 or 5)
            ],
            call_to_action=f"Start with {domain.name} now to quickly reduce your biggest risk area and build a strong foundation."
        )
        response_data.append(domain_item)

    return response_data

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
