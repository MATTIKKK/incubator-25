import asyncio
from spade.agent import Agent
from spade.behaviour import CyclicBehaviour
from spade.message import Message
import json
from datetime import datetime

class SPADEAgent(Agent):
    class CommunicationBehaviour(CyclicBehaviour):
        async def on_start(self):
            print(f"SPADE Agent started at {datetime.now()}")

        async def run(self):
            # Попытаться принять входящее сообщение (timeout=10 секунд)
            msg = await self.receive(timeout=10)
            if msg:
                print(f"SPADE Agent received message: {msg.body}")
                # Сформировать ответ и отправить его Agent.js (agent2@localhost)
                response = Message(
                    to="agent2@jabber.hot-chilli.net",
                    body=json.dumps({
                        "response": f"SPADE Agent processed: {msg.body}",
                        "timestamp": str(datetime.now())
                    }),
                    metadata={"protocol": "a2a", "type": "response"}
                )
                await self.send(response)

            # Каждые 5 секунд отправлять «приветствие» второму агенту
            greeting = Message(
                to="agent2@jabber.hot-chilli.net",
                body=json.dumps({
                    "message": "Hello from SPADE Agent!",
                    "timestamp": str(datetime.now())
                }),
                metadata={"protocol": "a2a", "type": "greeting"}
            )
            await self.send(greeting)

            await asyncio.sleep(5)

    async def setup(self):
        print("SPADE Agent setting up...")
        behaviour = self.CommunicationBehaviour()
        self.add_behaviour(behaviour)


async def main():
    # Инициализируем агента с JID и паролем для публичного XMPP сервера
    spade_agent = SPADEAgent("agent1@jabber.hot-chilli.net", "your_secure_password123")

    print("Starting SPADE Agent...")
    try:
        # Запуск агента: start() возвращает asyncio.Future
        future = spade_agent.start()

        # Ждём, пока агент полностью инициализируется (await вызова setup())
        await future
        print("SPADE Agent is running. Press Ctrl+C to stop.")

        # Держим цикл живым, пока агент «в онлайне»
        while spade_agent.is_alive():
            await asyncio.sleep(1)
    except Exception as e:
        print(f"Error occurred: {e}")
    except KeyboardInterrupt:
        print("\nKeyboardInterrupt received. Stopping SPADE Agent...")

    # Останавливаем агента и ждём завершения всех внутренних задач
    if spade_agent.is_alive():
        stop_future = spade_agent.stop()
        await stop_future
        print("SPADE Agent stopped.")


if __name__ == "__main__":
    # Запустим корутину main() в собственном asyncio-лупе
    asyncio.run(main())
