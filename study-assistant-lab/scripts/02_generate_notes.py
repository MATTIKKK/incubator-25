import json
from pathlib import Path
from typing import List, Optional

from dotenv import load_dotenv
from openai import OpenAI
from pydantic import BaseModel, Field, ValidationError
load_dotenv()                    

client = OpenAI()
OUT_PATH = Path("exam_notes.json") 

class Note(BaseModel):
    id: int = Field(..., ge=1, le=10)
    heading: str = Field(..., example="Mean Value Theorem")
    summary: str = Field(..., max_length=150)
    page_ref: Optional[int] = Field(None, description="Page number in source PDF")

SYSTEM_PROMPT = (
    "You are a study summarizer. "
    "Return exactly 10 unique notes that will help prepare for the exam. "
    "Each note must have fields: id, heading, summary, page_ref (nullable). "
    'Respond *only* with valid JSON of the form {"notes":[Note, …]}.'
)

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "system", "content": SYSTEM_PROMPT}],
    response_format={"type": "json_object"},
)

data = json.loads(response.choices[0].message.content)

try:
    notes: List[Note] = [Note(**item) for item in data["notes"]]
    if len(notes) != 10:
        raise ValueError("Model did not return exactly 10 notes.")
except (KeyError, ValidationError, ValueError) as e:
    raise SystemExit(f"❌ Invalid JSON from model: {e}") from None

print("\n✨ Generated Study Notes:\n")
for note in notes:
    print(f"📝 {note.id}. {note.heading}")
    print(f"   {note.summary}")
    if note.page_ref:
        print(f"   📚 Page: {note.page_ref}")
    print()

OUT_PATH.write_text(
    json.dumps({"notes": [n.model_dump() for n in notes]}, indent=2, ensure_ascii=False)
)
print(f"💾 Saved to {OUT_PATH.resolve()}\n")
