# Setting up the game of Jeopardy

# Default colors, keys and clue values (for 6 players)
colors = ["#3e4444", "#82b74b", "#405d27", "#544130", "#441c1c", "#361c44"]
keys = ["a", "l", "u", "n", "+", "-"]
values = [100, 200, 300, 400, 500, 600]

def create_players(buzzers=False):
    players = {}
    while True:
        player = input("Player name: ");
        if player is "":
            # Configuration is done when no name is entered
            break

        default_color = colors[len(players)]
        color = input("Color (leave blank for " + default_color + "): ")
        # Assign the default color if no other is supplied
        if color is "":
            color = default_color

        # Create player and assign given color and points
        players[player] = {}
        players[player]["color"] = color
        players[player]["points"] = 0

        # Are we playing with buzzer support?
        if buzzers:
            default_key = keys[len(players)]
            key = input("Key (Leave blank for " + default_key + "): ")
            # Assign the chosen buzzer key
            if key is "":
                key = default_key
            players[player]["key"] = key

    return players