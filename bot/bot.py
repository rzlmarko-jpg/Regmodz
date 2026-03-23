import requests
from telegram.ext import Updater, CommandHandler

API_URL = "https://vercel.com/rzlmarko-jpgs-projects"

TOKEN = "8312178344:AAHnCUnVePaSPlyzlfZwmmgLNwTlDtYrAhc"

def start(update, context):
    update.message.reply_text("Admin Panel:\n/gen 1d\n/check KEY\n/list\n/del KEY\n/ban KEY")

def gen(update, context):
    duration = context.args[0]

    r = requests.post(f"{API_URL}/createKey", json={"duration": duration})
    data = r.json()

    update.message.reply_text(f"Key: {data['key']}\nExpire: {data['expired_at']}")

def check(update, context):
    key = context.args[0]

    r = requests.get(f"{API_URL}/keyInfo?key={key}")
    data = r.json()

    update.message.reply_text(str(data))

def list_keys(update, context):
    r = requests.get(f"{API_URL}/listKeys")
    data = r.json()

    text = "\n".join([k["key"] for k in data])

    update.message.reply_text(text)

def delete(update, context):
    key = context.args[0]

    requests.post(f"{API_URL}/deleteKey", json={"key": key})
    update.message.reply_text("Deleted")

def ban(update, context):
    key = context.args[0]

    requests.post(f"{API_URL}/banKey", json={"key": key})
    update.message.reply_text("Banned")

def main():
    updater = Updater(TOKEN, use_context=True)
    dp = updater.dispatcher

    dp.add_handler(CommandHandler("start", start))
    dp.add_handler(CommandHandler("gen", gen))
    dp.add_handler(CommandHandler("check", check))
    dp.add_handler(CommandHandler("list", list_keys))
    dp.add_handler(CommandHandler("del", delete))
    dp.add_handler(CommandHandler("ban", ban))

    updater.start_polling()
    updater.idle()

if __name__ == "__main__":
    main()
