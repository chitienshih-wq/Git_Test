# Markdown 語法 效果 與 語法 對照表
# Markdown 語法 效果 與 語法 對照表

---

## 1️⃣ 粗體（Bold）
**粗體**
"**粗體**"

---

## 2️⃣ 斜體（Italic）
*斜體*
"*斜體*"

---

## 3️⃣ 粗斜體（Bold + Italic）
***粗斜體***
"***粗斜體***"

---

## 4️⃣ 標題（Headings）
# H1 標題
"# H1 標題"

## H2 標題
"## H2 標題"

### H3 標題
"### H3 標題"

#### H4 標題
"### H4 標題"
---

## 5️⃣ 無序清單（Bullet List）
- 項目 A
"- 項目 A"

- 項目 B
"- 項目 B"

---

## 6️⃣ 有序清單（Numbered List）
1. 步驟一
"1. 步驟一"

2. 步驟二
"2. 步驟二"

---

## 7️⃣ 引用（Blockquote）
> 這是一段引用
"> 這是一段引用"

---

## 8️⃣ 行內程式碼（Inline Code）
這是 `code`
"`code`"

---

## 9️⃣ 區塊程式碼（Code Block）

~~~python
print("Hello")
~~~

"
~~~python
print("Hello")
~~~
"

---

## 🔟 超連結（Link）
[Google](https://www.google.com)
"[Google](https://www.google.com)"

---

## 1️⃣1️⃣ 圖片（Image）
![替代文字](https://example.com/img.png)
"![替代文字](https://example.com/img.png)"

---

## 1️⃣2️⃣ 分隔線（Horizontal Rule）
---
"---"

---

## 1️⃣3️⃣ 表格（Table）
| 品項 | 價格 |
|------|------|
| 蘋果 | 30 |

"| 品項 | 價格 |
|------|------|
| 蘋果 | 30 |"

---

## 1️⃣4️⃣ 待辦清單（Task List）
- [ ] 未完成
"- [ ] 未完成"

- [x] 已完成
"- [x] 已完成"

---


| 左對齊 | 置中 | 右對齊 |
|:---|:---:|---:|
| Apple  | Banana | 30 |
| Orange | Kiwi   | 50 |


| 說明 |
|------|
| 第一行<br>第二行<br>第三行 |



| 指令 |
|------|
| `pip install numpy` |


| Python 範例 |
|-------------|
| <pre>def add(a, b):<br>    return a + b</pre> |


<table>
  <tr>
    <th colspan="2">合併兩欄</th>
  </tr>
  <tr>
    <td>A</td>
    <td>B</td>
  </tr>
</table>



<table>
  <tr>
    <td rowspan="2">合併兩行</td>
    <td>右 1</td>
  </tr>
  <tr>
    <td>右 2</td>
  </tr>
</table>


| Icon |
|------|
| ![img](https://via.placeholder.com/50) |


| 工具 | 連結 |
|------|------|
| ChatGPT | [點我](https://chat.openai.com) |


| 項目 | 說明 |
|:---:|---|
| ![img](https://via.placeholder.com/40) | 這是多行文字示範：<br>• 支援 `<br>`<br>• 可放圖片<br>• 可混合語法 |



# Advanced Markdown Showcase  
> A demonstration of what advanced Markdown formatting can achieve.

## 1. Introduction
Markdown is a lightweight markup language for writing documentation, notes, and web content.

---

## 2. Table of Contents
- [Introduction](#1-introduction)  
- [Table Example](#3-table-example)  
- [Code Blocks](#4-code-blocks)  
- [Quotes & Footnotes](#5-quotes--footnotes)  
- [To-Do List](#6-to-do-list)  
- [Collapsible Section](#7-collapsible-section)  
- [Mermaid Diagram](#8-mermaid-diagram)  

---

## 3. Table Example

| Feature            | Support | Notes |
|-------------------|---------|-------|
| **Bold / Italic** | ✔️      | Emphasis |
| **Tables**        | ✔️      | Useful for comparison |
| **Code Highlight**| ✔️      | Multi-language |
| **Collapsible**   | Partial | Platform-dependent |
| **Mermaid**       | Partial | Platform-dependent |

---

## 4. Code Blocks

### Python
```python
def fibonacci(n):
    seq = [0, 1]
    for i in range(2, n):
        seq.append(seq[-1] + seq[-2])
    return seq

print(fibonacci(10))
```

### Bash
```bash
#!/bin/bash
echo "Deploying project..."
git pull origin main
docker compose up -d
```

---

## 5. Quotes & Footnotes

> “Simplicity is the soul of wit.” — Shakespeare

This is a sentence with a footnote.[^1]

[^1]: Footnote content.

---

## 6. To-Do List
- [x] Create sample Markdown  
- [ ] Add images  
- [x] Add code blocks  
- [ ] Final review  

---

## 7. Collapsible Section

<details>
<summary>Click to expand</summary>

### Inside the collapsible block

- Supports **bold**, *italic*
- Supports code blocks:

```js
console.log("Inside collapsible block");
```

</details>

---

## 8. Mermaid Diagram
```mermaid
flowchart TD
    A[Start] --> B{Login?}
    B -- Yes --> C[Dashboard]
    B -- No --> D[Show Error]
    C --> E[Logout]
```

---

## 9. Conclusion
Markdown is flexible and powerful, especially with extended features.



## 8. Mermaid Diagram (Advanced)

```mermaid
flowchart TD

    %% 主流程
    A([Start]) --> B{User Logged In?}

    B -- Yes --> C[Load User Dashboard]
    B -- No --> D[Redirect to Login Page]

    %% 子流程：登入流程
    subgraph LOGIN_FLOW [Login Process]
        D --> D1[User Enters Credentials]
        D1 --> D2{Credentials Valid?}
        D2 -- Yes --> D3[Create Session Token]
        D2 -- No --> D4[Show Error Message]
        D4 --> D1
    end

    D3 --> C

    %% 子流程：Dashboard 功能
    subgraph DASHBOARD [Dashboard Modules]
        C --> E[Load Notifications]
        C --> F[Load Recent Activities]
        C --> G[Fetch User Settings]

        E --> E1{Unread Messages?}
        E1 -- Yes --> E2[Highlight Message Icon]
        E1 -- No --> E3[Normal State]

        F --> F1[Parse Logs]
        F1 --> F2[Generate Activity Summary]

        G --> G1[Check Preference Flags]
        G1 --> G2[Apply Theme]
        G2 --> C
    end

    %% 登出流程
    C --> H{Log Out?}
    H -- Yes --> I[Clear Session & Cookies]
    H -- No --> C
    I --> J([End])
```




---

## 8. Mermaid Diagram (Large-Scale System Architecture – GitHub Compatible)

```mermaid
flowchart LR

    %% ========== Client Layer ==========
    subgraph CLIENTS [Client Layer]
        WEB[Web Client] 
        MOB[Mobile App] 
        EXT[3rd-Party Integrations]
    end

    %% ========== Edge / Delivery Layer ==========
    subgraph EDGE [Edge & Delivery Layer]
        CDN[CDN]
        WAF[WAF / Web Application Firewall]
        LB[Global Load Balancer]
    end

    WEB --> CDN --> WAF --> LB
    MOB --> LB
    EXT --> LB

    %% ========== API Gateway & Auth ==========
    subgraph GATEWAY [API Gateway & Auth]
        APIGW[API Gateway]
        AUTH["Auth Service\n(OAuth2 / JWT)"]
        RATELIMIT["Rate Limiter"]
    end

    LB --> APIGW
    APIGW --> RATELIMIT --> AUTH

    %% ========== Microservices Layer ==========
    subgraph SERVICES [Microservices Layer]
        S_USER[User Service]
        S_ORDER[Order Service]
        S_PAYMENT[Payment Service]
        S_INVENTORY[Inventory Service]
        S_NOTIFICATION[Notification Service]
        S_SEARCH[Search Service]
        S_REPORT[Reporting Service]
        S_BILLING[Billing Service]
        S_PROFILE[Profile Service]
    end

    AUTH --> S_USER
    APIGW --> S_ORDER
    APIGW --> S_PAYMENT
    APIGW --> S_INVENTORY
    APIGW --> S_NOTIFICATION
    APIGW --> S_SEARCH
    APIGW --> S_REPORT
    APIGW --> S_BILLING
    APIGW --> S_PROFILE

    %% ========== Async / Messaging Layer ==========
    subgraph ASYNC [Async & Event Streaming]
        MQ["Message Queue\n(RabbitMQ)"]
        EVT["Event Bus / Stream\n(Kafka)"]
        DLQ["Dead Letter Queue"]
    end

    S_ORDER --> MQ
    S_PAYMENT --> MQ
    S_INVENTORY --> EVT
    S_NOTIFICATION --> MQ
    MQ --> DLQ

    EVT --> S_REPORT
    EVT --> S_BILLING
    EVT --> S_NOTIFICATION

    %% ========== Data Layer ==========
    subgraph DATA [Data Storage Layer]
        DB_USER["User DB"]
        DB_ORDER["Order DB"]
        DB_PAYMENT["Payment DB"]
        DB_INVENTORY["Inventory DB"]
        DB_LOG["Log DB / Data Lake"]
        CACHE["Distributed Cache\n(Redis Cluster)"]
        SEARCHIDX["Search Index\n(Elasticsearch)"]
    end

    S_USER --> DB_USER
    S_ORDER --> DB_ORDER
    S_PAYMENT --> DB_PAYMENT
    S_INVENTORY --> DB_INVENTORY
    S_REPORT --> DB_LOG
    S_SEARCH --> SEARCHIDX

    S_USER --> CACHE
    S_ORDER --> CACHE
    S_INVENTORY --> CACHE
    S_PROFILE --> CACHE

    %% ========== Batch / Analytics / BI ==========
    subgraph ANALYTICS [Analytics / BI / Batch Jobs]
        ETL[ETL Jobs]
        DW["Data Warehouse"]
        BI["BI Dashboard"]
        ML["ML Service\n(Recommendation Engine)"]
    end

    DB_ORDER --> ETL
    DB_PAYMENT --> ETL
    DB_USER --> ETL
    DB_LOG --> ETL

    ETL --> DW
    DW --> BI
    DW --> ML
    ML --> S_RECO["Recommendation API"]

    %% Recommendation API 接回 Gateway
    S_RECO --> APIGW

    %% ========== Observability & Ops ==========
    subgraph OBS [Observability & Operations]
        LOG["Centralized Logging"]
        METRIC["Metrics Store"]
        TRACE["Distributed Tracing"]
        ALERT["Alert Manager"]
        DASH["Ops Dashboard"]
    end

    SERVICES --> LOG
    SERVICES --> METRIC
    SERVICES --> TRACE
    LOG --> ALERT
    METRIC --> ALERT
    ALERT --> DASH

    %% ========== Infra / Platform ==========
    subgraph INFRA [Infrastructure Platform]
        K8S["Kubernetes Cluster"]
        REG["Container Registry"]
        CI["CI Pipeline"]
        CD["CD Pipeline"]
        SECRETS["Secrets Manager"]
    end

    CI --> CD --> K8S
    REG --> K8S
    SECRETS --> SERVICES
    K8S --> SERVICES
    K8S --> GATEWAY
    K8S --> ASYNC
    K8S --> DATA
```

