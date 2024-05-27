import numpy as np


class MLOps:
    def __init__(self):
        self.scaler = None
        self.model = None

    def preprocess(self, distance: float, covered: bool, length: float, width: float):
        int_covered = 1 if covered else 0
        scaled_data = self.scaler.transform([[distance, length, width]])
        data = np.insert(scaled_data, 1, int_covered, axis=None).reshape(1, -1)
        return data

    def predict(self, data):
        return self.model.predict(data)


ml_ops = MLOps()
