import re
from typing import List, Match, Optional

ADJECTIVES: List[str] = ['able', 'acid', 'acidic', 'acrid', 'adolescent', 'all', 'amazing',
                         'ancient', 'angelic', 'antique', 'appetizing', 'aromatic', 'automatic',
                         'awake', 'awful', 'baby', 'babyish', 'bad', 'belated', 'bent', 'best',
                         'better', 'big', 'bitter', 'black', 'bland', 'blaring', 'blue', 'boiling',
                         'brief', 'broken', 'brown', 'burning', 'carefree', 'ceramic', 'certain',
                         'cheap', 'cheerful', 'chemical', 'chief', 'china', 'circular', 'clean',
                         'clear', 'close', 'closed', 'cloth', 'coarse', 'cold', 'colorless',
                         'comfortable', 'common', 'cooking', 'cotton', 'crooked', 'cruel', 'cut',
                         'dance', 'dark', 'dead', 'deafening', 'dear', 'deep', 'delayed',
                         'delectable', 'delicate', 'dense', 'dependent', 'different', 'difficult',
                         'disgusting', 'distant', 'distorted', 'drab', 'dull', 'each', 'elastic',
                         'elated', 'elliptical', 'enormous', 'equal', 'equatorial', 'evening',
                         'everlasting', 'every', 'evil', 'excited', 'fabric', 'faint', 'false',
                         'fantastic', 'far', 'faraway', 'fast', 'fat', 'feeble', 'female',
                         'fertile', 'feverish', 'few', 'fiery', 'fixed', 'flat', 'folding',
                         'foolish', 'four', 'fragrant', 'free', 'freezing', 'frequent', 'frigid',
                         'frozen', 'full', 'future', 'general', 'giant', 'gigantic', 'glass',
                         'gleaming', 'globular', 'glowing', 'good', 'grainy', 'gray', 'great',
                         'green', 'grey', 'hanging', 'hard', 'heavy', 'high', 'hollow', 'hot',
                         'huge', 'hulking', 'hushed', 'icy', 'ill', 'important', 'infantile',
                         'initial', 'irregular', 'jumbo', 'kind', 'last', 'late', 'lean', 'leather',
                         'left', 'like', 'living', 'loathesome', 'lonely', 'long', 'loose', 'loud',
                         'lovely', 'low', 'luminous', 'lunar', 'male', 'many', 'married',
                         'material', 'mature', 'medical', 'mediocre', 'metal', 'metallic',
                         'military', 'mixed', 'modern', 'morning', 'mountainous', 'mute', 'narrow',
                         'natural', 'necessary', 'new', 'no', 'noisy', 'normal', 'obese', 'oblong',
                         'oceanic', 'old', 'one', 'open', 'opposite', 'orange', 'ornate',
                         'outgoing', 'oval', 'overdue', 'palatable', 'pale', 'parallel', 'past',
                         'pastel', 'perfumed', 'pertinent', 'pink', 'pitted', 'plastic', 'plump',
                         'polar', 'polished', 'political', 'poor', 'possible', 'present', 'private',
                         'probable', 'public', 'pungent', 'putrid', 'quick', 'racing', 'radiant',
                         'rapid', 'rare', 'ready', 'recent', 'red', 'reeking', 'regular', 'remote',
                         'responsible', 'rich', 'rolling', 'rotund', 'rough', 'round', 'rushing',
                         'sad', 'safe', 'same', 'savory', 'scalding', 'scaly', 'scarce', 'scared',
                         'scented', 'second', 'secret', 'separate', 'serpentine', 'several',
                         'shadowy', 'sharp', 'shimmering', 'shining', 'short', 'shouting', 'shut',
                         'silent', 'silicon', 'silver', 'skeletal', 'sleek', 'sleeping', 'slender',
                         'slim', 'slow', 'small', 'smooth', 'soft', 'solid', 'some', 'sour',
                         'special', 'speeding', 'spicy', 'square', 'steaming', 'steel', 'stiff',
                         'sudden', 'svelte', 'sweet', 'sweltering', 'swift', 'swinging',
                         'talkative', 'tall', 'tanned', 'tasteless', 'teenage', 'thick', 'thin',
                         'thunderous', 'tiny', 'tired', 'triangular', 'trim', 'true', 'two',
                         'uncomfortable', 'unusual', 'useful', 'useless', 'usual', 'valuable',
                         'vast', 'velvety', 'violent', 'vociferous', 'waiting', 'walking', 'warm',
                         'warped', 'wasteful', 'watery', 'wavy', 'wee', 'wet', 'whispered', 'white',
                         'wide', 'willowy', 'winding', 'wiry', 'wise', 'wonderful', 'wooden',
                         'work', 'worse', 'wrong', 'yellow', 'yellowish', 'young', 'zany', 'zigzag']
NOUNS: List[str] = ['addax', 'adder', 'agama', 'agouti', 'albacore', 'albatross', 'alewife',
                    'alpaca', 'angelfish', 'anhinga', 'ant', 'anteater', 'antelope', 'ape', 'aphid',
                    'argali', 'argonaut', 'ass', 'avocet', 'ayeaye', 'baboon', 'badger',
                    'bandicoot', 'banteng', 'barb', 'barbel', 'barbet', 'barnacle', 'basilisk',
                    'bass', 'bateleur', 'bear', 'beaver', 'becard', 'bedbug', 'bee', 'beetle',
                    'beluga', 'bichir', 'binturong', 'bird', 'bison', 'bittern', 'bloodworm',
                    'bluebeetle', 'bluebird', 'bluegill', 'bluejay', 'boa', 'boar', 'boatbill',
                    'bobcat', 'bobolink', 'bongo', 'bonito', 'boobook', 'booby', 'booklouse',
                    'bowerbird', 'bowfin', 'bowhead', 'boxfish', 'bream', 'brill', 'broadbill',
                    'brolga', 'buffalo', 'bug', 'bulbul', 'bunting', 'burbot', 'bustard', 'buzzard',
                    'cachalot', 'cacique', 'caiman', 'camel', 'canary', 'canvasback', 'capuchin',
                    'caracal', 'cardinal', 'caribou', 'carp', 'cat', 'catfish', 'cavefish', 'cavy',
                    'centipede', 'chacma', 'chafer', 'chameleon', 'chamois', 'char', 'characin',
                    'cheetah', 'chickadee', 'chicken', 'chickenhawk', 'chigger', 'chimaera',
                    'chimpanzee', 'chipmunk', 'chiton', 'choogh', 'chub', 'cicada', 'civet', 'clam',
                    'coati', 'coatofmail', 'cobra', 'cockatoo', 'cod', 'colugo', 'condor',
                    'coneshell', 'conger', 'coot', 'copperhead', 'coral', 'cormorant', 'cotinga',
                    'cougar', 'cow', 'cowbird', 'cowfish', 'cowrie', 'coyote', 'coypu', 'crab',
                    'crane', 'crappie', 'crayfish', 'creeper', 'cricket', 'crocodile', 'crow',
                    'cuckoo', 'curlew', 'cuscus', 'dab', 'dace', 'damselfish', 'dasyure', 'deer',
                    'defassa', 'desman', 'dhole', 'dibatag', 'dikdik', 'dingo', 'dipper', 'dog',
                    'dogfish', 'donkey', 'doodlebug', 'dormouse', 'dory', 'dove', 'drill', 'duck',
                    'dugong', 'duiker', 'dunnart', 'eagle', 'earwig', 'earworm', 'echidna', 'eel',
                    'eelworm', 'egret', 'eider', 'eland', 'elephant', 'elk', 'emu', 'ermine',
                    'falcon', 'fantail', 'fennec', 'ferdelance', 'ferret', 'finback', 'fish',
                    'fisher', 'flamingo', 'flatfish', 'flatworm', 'flea', 'flicker', 'flounder',
                    'fluke', 'fox', 'frigatebird', 'frog', 'froghopper', 'frogmouth', 'fulmar',
                    'galagos', 'galah', 'gannet', 'gar', 'gaur', 'gavial', 'gazelle', 'gecko',
                    'genet', 'gerbil', 'gerenuk', 'gharial', 'gibbon', 'giraffe', 'globefish',
                    'glowworm', 'gnat', 'gnu', 'goat', 'goby', 'godwit', 'goose', 'gopher',
                    'gorilla', 'grampus', 'grayling', 'grebe', 'grosbeak', 'grouper', 'grouse',
                    'grub', 'guan', 'guanaco', 'gudgeon', 'guenon', 'guereza', 'guitarfish', 'gull',
                    'haddock', 'hagfish', 'hake', 'halibut', 'hammerjaw', 'hare', 'harrier',
                    'hartebeest', 'hawk', 'hedgehog', 'heron', 'herring', 'hoatzin', 'hog',
                    'hogfish', 'hookworm', 'hoopoe', 'hornet', 'horse', 'human', 'hyena', 'ibex',
                    'ibis', 'iguana', 'impala', 'insect', 'jacamar', 'jacana', 'jackal', 'jaeger',
                    'jaguar', 'jay', 'jerboa', 'jird', 'kagu', 'kakapo', 'kangaroo', 'kea', 'kiang',
                    'kinkajou', 'kite', 'kiwi', 'knifefish', 'knot', 'koala', 'kob', 'kouprey',
                    'krill', 'kudu', 'lacewing', 'lancelet', 'langur', 'lapwing', 'lark',
                    'leafhopper', 'leatherback', 'leech', 'lemming', 'lemur', 'leopard', 'liger',
                    'limpet', 'linnet', 'linsang', 'lion', 'lizard', 'llama', 'loach', 'lobefin',
                    'locust', 'loggerhead', 'loon', 'loris', 'lory', 'louse', 'lovebird', 'lugworm',
                    'macaque', 'macaw', 'mackerel', 'maggot', 'magpie', 'mallard', 'mamba',
                    'manakin', 'manatee', 'mangabey', 'mantis', 'mara', 'marabou', 'margay',
                    'marlin', 'marmoset', 'marmot', 'marten', 'martin', 'meadowlark', 'mealworm',
                    'meerkat', 'merganser', 'merlin', 'midge', 'millipede', 'mink', 'minke',
                    'minnow', 'mite', 'mole', 'mollusk', 'mongoose', 'monitor', 'monkey', 'moorhen',
                    'moose', 'mosquito', 'moth', 'mouflon', 'mouse', 'mousebird', 'mousehare',
                    'mudnester', 'mule', 'mullet', 'muskox', 'mussel', 'nautilus', 'needlefish',
                    'newt', 'nilgai', 'nutria', 'nyala', 'oarfish', 'ocelot', 'octopus', 'okapi',
                    'opossum', 'orca', 'oriole', 'ortolan', 'otter', 'ovenbird', 'owl', 'paca',
                    'panda', 'pangolin', 'parakeet', 'parrot', 'parrotfish', 'peacock', 'peccary',
                    'peewit', 'pelican', 'penguin', 'perentie', 'petrel', 'phalanger', 'phalarope',
                    'pheasant', 'pig', 'pigeon', 'pika', 'pike', 'pilotfish', 'pineconefish',
                    'pinworm', 'pipefish', 'pipit', 'piranha', 'pitta', 'plaice', 'plover',
                    'pochard', 'polecat', 'pollack', 'pompano', 'porcupine', 'porpoise', 'possum',
                    'potto', 'ptarmigan', 'puffin', 'puma', 'quelea', 'quetzal', 'quokka', 'rabbit',
                    'raccoon', 'rail', 'rat', 'raven', 'ray', 'redhead', 'redpoll', 'reindeer',
                    'remora', 'rhea', 'roach', 'roadrunner', 'robin', 'rorqual', 'rotifer', 'sable',
                    'salmon', 'sapsucker', 'sardine', 'sawfish', 'sawyer', 'scallop', 'scarab',
                    'scorpion', 'seagull', 'seahorse', 'seal', 'seasquirt', 'seastar', 'serval',
                    'shark', 'shearwater', 'sheep', 'shelduck', 'shipworm', 'shoebill', 'shoveler',
                    'sidewinder', 'silverfish', 'skate', 'skimmer', 'skink', 'skua', 'skunk',
                    'sloth', 'slowworm', 'slug', 'smelt', 'snail', 'snake', 'sole', 'sparrow',
                    'sparrowhawk', 'spearfish', 'spider', 'sponge', 'spoonbill', 'squid',
                    'squirrel', 'starfish', 'starling', 'stoat', 'stonechat', 'stonefish', 'stork',
                    'sturgeon', 'sunfish', 'suslik', 'swallow', 'swallowtail', 'swan', 'swift',
                    'tadpole', 'taipan', 'tamarin', 'tanager', 'tapeworm', 'tapir', 'tarpon',
                    'tarsier', 'teal', 'tellin', 'tenrec', 'termite', 'tern', 'terrapin', 'tetra',
                    'tick', 'tiger', 'tigon', 'tinamou', 'titmouse', 'toad', 'topi',
                    'tortoise', 'toucan', 'touraco', 'towhee', 'treefrog', 'treesnake', 'trematode',
                    'triggerfish', 'trogon', 'trout', 'tsetse', 'tuna', 'tunicate', 'turbot',
                    'turkey', 'vicuña', 'viper', 'vireo', 'viscacha', 'vole', 'vulture', 'wagtail',
                    'wallaby', 'walleye', 'walrus', 'wapiti', 'wasp', 'waterbuck', 'waxbill',
                    'waxwing', 'weasel', 'weaver', 'weevil', 'weta', 'whale', 'whelk',
                    'whippoorwill', 'whitebait', 'whitefish', 'whiting', 'wigeon', 'wildebeest',
                    'willet', 'winkel', 'wireworm', 'wisent', 'wolf', 'wolverine', 'wombat',
                    'woodcock', 'woodlouse', 'woodpecker', 'woodworm', 'worm', 'wrasse', 'wren',
                    'yak', 'yellowlegs', 'zebra', 'zebu']


def _filter_complex_words(words: List[str]) -> List[str]:
    """Filters the given list of words of 'complex' words.

    'Complex' words are defined as those having 3 or more consecutive consonants or vowels.

    :param words: List of words.
    :return: List of 'simple' words, i.e. having no more than 2 consecutive consonants or vowels.
    """

    def _has_n_conseq_letters(word: str, pattern: str,
                              num_conseq_letters: int = 3) -> (Optional[Match[str]]):
        return re.search(f'\w*{pattern * num_conseq_letters}\w*', word)

    simple_words = filter(lambda w: not _has_n_conseq_letters(w, r'[^aeiou]', 3), words)
    simple_words = list(filter(lambda w: not _has_n_conseq_letters(w, r'[aeiou]', 3), simple_words))
    return simple_words


def _split_string_into_word_list(items_str: str) -> List[str]:
    """Preprocesses a string of one-word items delimited by ', ' into a sorted list of items.

    :param items_str: String of items delimited by comma, e.g. 'cat, dog, bird, ...'.
    :return: Sorted list of unique lowercase items.
    """
    items = re.sub(r'[^\w\s]', '', items_str.lower()).split()
    sorted_unique_items = sorted(set(items))
    return sorted_unique_items
