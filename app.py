import eel, json, sys
import game_setup

# Do the game setup
players = game_setup.create_players()

# Load the clues from json
with open(sys.argv[1]) as clueFile: 
    clues = json.load(clueFile)

# Preprocess the clues (add default values if clueset doesn't provide its own)
for category in clues:
    if not "values" in category:
        category["values"] = game_setup.values

    for clue in category["clues"]:
        if not "played" in clue:
            clue["played"] = False

# Eel stuff
eel.init("web")

@eel.expose
def quit_app():
    quit()

@eel.expose
def show_clue(category_index, clue_index):
    eel.showClue(clues, category_index, clue_index)

@eel.expose
def update_board():
    eel.populateBoard(clues, players)
    eel.printPlayers(players)
    eel.updateInfoDisplay({1: {"color": "black", "text": "Jeopardy!"}})

eel.start("main.html", block=False)

while True:
    eel.sleep(1.0)