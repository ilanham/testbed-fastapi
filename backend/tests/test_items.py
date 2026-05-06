import pytest
from httpx import AsyncClient


async def test_list_items_empty(client: AsyncClient):
    response = await client.get("/api/items/")
    assert response.status_code == 200
    assert response.json() == []


async def test_create_item(client: AsyncClient):
    response = await client.post("/api/items/", json={"name": "Widget", "description": "A thing"})
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Widget"
    assert data["description"] == "A thing"
    assert "id" in data
    assert "created_at" in data
    assert "updated_at" in data


async def test_create_item_minimal(client: AsyncClient):
    response = await client.post("/api/items/", json={"name": "Bare"})
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Bare"
    assert data["description"] is None


async def test_create_item_missing_name(client: AsyncClient):
    response = await client.post("/api/items/", json={"description": "No name"})
    assert response.status_code == 422


async def test_get_item(client: AsyncClient):
    create = await client.post("/api/items/", json={"name": "Gadget"})
    item_id = create.json()["id"]

    response = await client.get(f"/api/items/{item_id}")
    assert response.status_code == 200
    assert response.json()["name"] == "Gadget"


async def test_get_item_not_found(client: AsyncClient):
    response = await client.get("/api/items/999999")
    assert response.status_code == 404


async def test_list_items_returns_created(client: AsyncClient):
    await client.post("/api/items/", json={"name": "Alpha"})
    await client.post("/api/items/", json={"name": "Beta"})

    response = await client.get("/api/items/")
    assert response.status_code == 200
    names = [i["name"] for i in response.json()]
    assert "Alpha" in names
    assert "Beta" in names


async def test_update_item_name(client: AsyncClient):
    create = await client.post("/api/items/", json={"name": "Old Name"})
    item_id = create.json()["id"]

    response = await client.patch(f"/api/items/{item_id}", json={"name": "New Name"})
    assert response.status_code == 200
    assert response.json()["name"] == "New Name"


async def test_update_item_partial(client: AsyncClient):
    create = await client.post(
        "/api/items/", json={"name": "Original", "description": "Keep me"}
    )
    item_id = create.json()["id"]

    response = await client.patch(f"/api/items/{item_id}", json={"name": "Updated"})
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Updated"
    assert data["description"] == "Keep me"


async def test_update_item_not_found(client: AsyncClient):
    response = await client.patch("/api/items/999999", json={"name": "Ghost"})
    assert response.status_code == 404


async def test_delete_item(client: AsyncClient):
    create = await client.post("/api/items/", json={"name": "ToDelete"})
    item_id = create.json()["id"]

    response = await client.delete(f"/api/items/{item_id}")
    assert response.status_code == 204

    response = await client.get(f"/api/items/{item_id}")
    assert response.status_code == 404


async def test_delete_item_not_found(client: AsyncClient):
    response = await client.delete("/api/items/999999")
    assert response.status_code == 404
