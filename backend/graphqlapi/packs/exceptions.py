class EditPackInputError(ValueError):
    def __init__(self) -> None:
        message = "No data provided. At least one field to edit should be provided."
        ValueError.__init__(self, message)


class AddWordsToPackInputError(ValueError):
    def __init__(self) -> None:
        message = "List with words is empty. At least one item should be provided."
        ValueError.__init__(self, message)


class RemoveWordsFromPackInputError(ValueError):
    def __init__(self) -> None:
        message = "List with indexes is empty. At least one index should be provided."
        ValueError.__init__(self, message)


class EditPackError(ValueError):
    def __init__(self) -> None:
        message = "You can not edit packs of other users."
        ValueError.__init__(self, message)


class PrivatePuckError(ValueError):
    def __init__(self) -> None:
        message = "You can not view private pucks."
        ValueError.__init__(self, message)
