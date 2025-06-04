from pathlib import Path
from openai import OpenAI
from dotenv import load_dotenv
load_dotenv()
client = OpenAI()

assistant = client.beta.assistants.create(
    name="Study Q&A Assistant",
    model="gpt-4o-mini",
    tools=[{"type": "file_search"}],
)

vector_store = client.vector_stores.create(name="study-pdf-store")

client.vector_stores.file_batches.upload_and_poll(
    vector_store_id=vector_store.id,
    files=[Path("data/e-commerce.pdf")],          # ← Path OK
    # или files=[open("data/e-commerce.pdf", "rb")]  # ← тоже OK
)

client.beta.assistants.update(
    assistant.id,
    tool_resources={"file_search": {"vector_store_ids": [vector_store.id]}},
)

print("✅ bootstrap finished — assistant ready")
