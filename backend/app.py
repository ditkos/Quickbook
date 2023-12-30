from flask import Flask, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_data():
    base_url = 'https://sandbox-quickbooks.api.intuit.com'
    token = 'eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..cl_AmPzVBx8poO9caIBFpQ.rC6srxBbNBXvF3GrOg1gUXne4VN0kqm9WrjmJraj_sR-t1ByQUmHo4UFpzTBJ7ouZGMzZXqQBc9wZMk1-oLofOPKyCkJ3Liah4uqQecC3cZgZzUpMzAKnfEsSPjKG307tq9vfW9etJ2iXe780TVDKydmq1UHNH1YYL-4GdxzjplH32haPOFVV9yn6F6Hm-US4j5chfvtD7Ogl9HFbERPojZAofk4dOqlSKwmgVBJy_Ixa6iV_LHHU-i0RQKRRFcxHmWbhYVM_xhrsYl0-hwL7lTkeVqyv3eCk81sKI50E8RXWr0bi1CK1hdy-ZmGdIi4l3xmMYYnP17x_9EWHB3rRxwUjeO4qBW3QKLaJQ4GWNJ2O93oy1cLGaJveZ-i5eUuSqjHRCgbkZByqpUHntX_S8_0yx0Q8tuDedYVkeEgXgnfj0MCNO7iyAIJXrIIgMSSkNszSSnvgLDxwS5zc97feu1R_pReZlT41MRYPNY9G6f5-cTWTeRZ0D31yXmmDuWFLqloz9CRddx4asAnCLO4o5adJv07oyZX9PHodpWIWbo2gf9zrrobSG1e0uPJXBjBQwgEbmzNHkoTC1UCGvzcH-FkRUq-d_ktEu7zzJPN_Rk4hzwJF-PIRtL5ak0kCkkUJnoLqYUj4pRm0k7CRYLXQpNVGMue3KSjQ9xYQmCsFN3Wzpc6gmjNQ6c14AQnwaE78H3VEE3ySIEi14H2SEOB6F0yMsHzaNn5aru5sl8kXPQolGUF3Jri3P_KX1n-Rx38cyz7QjCKoQuZJ09VlEh_NkT5Gh_ng_pXLURODopWvd4_3wTbQ1CFLMgMS7k2iOQVlvDAEJcGXYG94iz8htcKWJHmroxPe1fWmmXxzBtsrOf2mCjrWOzxAIXWuqe_ie0KB2XD6apUoPT054jdeSnMWw.ef2hY75JbYBRykWXPVrhfQ'
    url = base_url + '/v3/company/4620816365375100010/query?query=select%20*%20from%20Account%20where%20Metadata.CreateTime%20%3E%20%272014-12-31%27&minorversion=69'

    headers = {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json'
    }

    response = requests.get(url, headers=headers)

    if response.ok:
        data = response.json()
        return data
    else:
        # Handle error
        return None

@app.route('/')
def index():
    result = get_data()
    if result:
        return jsonify(result)
    else:
        return "Error al recuperar los datos", 500









if __name__ == '__main__':
    app.run(debug=True)