from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from models.item import Item
from schemas.item import ItemCreate, ItemUpdate


async def list_items(session: AsyncSession) -> list[Item]:
    result = await session.execute(select(Item).order_by(Item.created_at.desc()))
    return list(result.scalars().all())


async def get_item(session: AsyncSession, item_id: int) -> Item | None:
    return await session.get(Item, item_id)


async def create_item(session: AsyncSession, payload: ItemCreate) -> Item:
    item = Item(**payload.model_dump())
    session.add(item)
    await session.commit()
    await session.refresh(item)
    return item


async def update_item(session: AsyncSession, item_id: int, payload: ItemUpdate) -> Item | None:
    item = await session.get(Item, item_id)
    if not item:
        return None
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(item, field, value)
    await session.commit()
    await session.refresh(item)
    return item


async def delete_item(session: AsyncSession, item_id: int) -> bool:
    item = await session.get(Item, item_id)
    if not item:
        return False
    await session.delete(item)
    await session.commit()
    return True
