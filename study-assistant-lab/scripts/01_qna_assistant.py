from __future__ import annotations
import os, time, json
from typing import Generator, List
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()                  
print("Key present:", bool(os.getenv("OPENAI_API_KEY")))              

def get_assistant_id(client: OpenAI) -> str:
    """Берём 1-го ассистента из аккаунта или бросаем ошибку."""
    assistants = client.beta.assistants.list(limit=1)
    if not assistants.data:
        raise RuntimeError("❌ No assistants found. Run 00_bootstrap.py first!")
    return assistants.data[0].id

def get_assistant_response(
    client: OpenAI,
    question: str,
    poll_interval: float = 0.5,
) -> tuple[str, List[str]]:
    """Возвращает (answer, [file_id, …]). Не стримит побуквенно."""
    assistant_id = get_assistant_id(client)

    # 1. создаём диалог-тред
    thread = client.beta.threads.create()
    client.beta.threads.messages.create(
        thread_id=thread.id,
        role="user",
        content=question,
    )

    # 2. запускаем ассистента
    run = client.beta.threads.runs.create(
        thread_id=thread.id,
        assistant_id=assistant_id,
    )

    # 3. ждём завершения
    while run.status not in ("completed", "failed"):
        time.sleep(poll_interval)
        run = client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)

    if run.status == "failed":
        print("❌ Run failed:", run.last_error)
        return "🤖 Sorry, something went wrong!", []

    # 4. берём **первое** ответное сообщение с ролью assistant
    messages = client.beta.threads.messages.list(
        thread_id=thread.id,
        order="desc",            # свежее → старое
        limit=10,
    )
    assistant_msg = next(m for m in messages.data if m.role == "assistant")

    text_block = assistant_msg.content[0].text
    answer = text_block.value
    citations = [
        ann.file_citation.file_id          # <— правильно берём ID
        for ann in text_block.annotations
        if ann.type == "file_citation"
    ]
    return answer, citations


def main() -> None:
    client = OpenAI()                       # ключ уже в ENV

    questions = [
        "Explain the difference between a definite and an indefinite integral in one paragraph.",
        "Give me the statement of the Mean Value Theorem."
    ]

    for q in questions:
        print(f"\n🎓 Question: {q}\n")
        answer, cites = get_assistant_response(client, q)
        print("📝 Answer:\n", answer)
        if cites:
            print("\n📚 Citations (file_id):")
            for cid in cites:
                print("-", cid)
        else:
            print("\n⚠️  No citations returned!")
        print("\n" + "="*60)


if __name__ == "__main__":
    main()
