import eel, json, sys
import game_setup

# Do the game setup
players = game_setup.create_players()
buzzers = True

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

# Manage the game, be a bridge, etc.
eel.init("web")

@eel.expose
def quit_app():
    quit()

@eel.expose
def show_clue(category_index, clue_index, value):
    eel.showClue(clues, category_index, clue_index, value)

@eel.expose
def update_board():
    eel.populateBoard(clues, players)
    eel.printPlayers(players)
    eel.updateInfoDisplay({1: {"color": "black", "text": game_setup.defaulttext}})

@eel.expose
def points_to_player(name, points):
    global players
    print(points, " for ", name)
    players[name]["points"] += points

@eel.expose
def solved_clue(name, category_index, clue_index):
    clues[category_index]["clues"][clue_index]["played"] = name

eel.start("main.html", block=False)

eel.setupKeys(players)

while True:
    eel.sleep(1.0)