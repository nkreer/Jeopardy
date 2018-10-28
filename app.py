import eel
import game_setup

players = game_setup.create_players()

# Eel stuff
eel.init("web")

@eel.expose
def quit_app():
    quit()

@eel.expose
def update_board():
    eel.populateBoard(5, 5)
    eel.printPlayers(players)
    eel.updateInfoDisplay({1: {"color": "black", "text": "Jeopardy!"}})

eel.start("main.html", block=False)

while True:
    eel.sleep(1.0)