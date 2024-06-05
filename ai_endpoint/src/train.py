import pickle
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

from constants import BOOLEAN_COLUMNS, COLUMNS_TO_NORMALIZE, CSV_PATH, HEAD, MODEL_PATH, SCALER_PATH


def load_data():
    df = pd.read_csv(CSV_PATH)
    df.info()
    df.head(HEAD)
    return df


def convert_boolean_columns_to_int(df):
    for column in BOOLEAN_COLUMNS:
        df[column] = df[column].astype(int)
    df.head(HEAD)
    return df


def normalize_columns(df):
    scaler = StandardScaler()
    df[COLUMNS_TO_NORMALIZE] = scaler.fit_transform(df[COLUMNS_TO_NORMALIZE])
    df.head(HEAD)

    # Save the scaler
    with open(SCALER_PATH, "wb") as f:
        pickle.dump(scaler, f)

    return df


def train():
    df = load_data()
    df = convert_boolean_columns_to_int(df)
    df = normalize_columns(df)

    X_train, X_test, y_train, y_test = train_test_split(
        df.drop(["Pret", "Nume"], axis=1), df["Pret"], test_size=0.3, random_state=42, shuffle=True
    )

    model = RandomForestRegressor(n_estimators=200)

    model.fit(X_train, y_train)

    with open(MODEL_PATH, "wb") as f:
        pickle.dump(model, f)

    y_pred = model.predict(X_test)

    differences = []
    for i in range(len(y_test)):
        differences.append(abs(y_test.iloc[i] - y_pred[i]))
    print(np.mean(differences))
    plt.figure(figsize=(10, 5))
    plt.plot(differences, marker="o", linestyle="-", markersize=4)
    plt.title("Diferențe între preziceri și valorea reală")
    plt.xlabel("Index")
    plt.ylabel("Prezicere - Valoare reală")
    plt.grid(True)
    plt.show()

if __name__ == "__main__":
    train()
