import pickle

from constants import MODEL_PATH, SCALER_PATH


def get_scaler():
    with open(SCALER_PATH, "rb") as f:
        return pickle.load(f)


def get_model():
    with open(MODEL_PATH, "rb") as f:
        return pickle.load(f)


def get_ml_deps():
    return get_scaler(), get_model()
