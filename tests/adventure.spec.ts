import { test, expect } from '@playwright/test';
import { stages } from '../src/game/stages';

test.beforeEach(async({page})=>{await page.goto('/');});
for(const stage of stages){test(`stage ${stage.stageId}: scene, characters, clue, and actions`,async({page})=>{
 await page.getByRole('button',{name:'설정',exact:true}).click();
 await page.getByLabel('Development Stage Selector').selectOption(String(stage.stageId));
 await expect(page.getByRole('heading',{level:1})).toHaveText(stage.title);
 await expect(page.getByRole('region',{name:new RegExp(stage.title)})).toBeVisible();
 await expect(page.locator('.pin-character svg')).toBeVisible();
 await expect(page.locator('.tuto-character svg')).toBeVisible();
 await page.getByRole('button',{name:new RegExp('^조사:')}).click();
 await expect(page.locator('.clue-popover')).toContainText(stage.puzzles[0].clue);
 await page.getByRole('button',{name:'관찰 닫기'}).click();
 await expect(page.locator('.world-machine:not(.route-machine), .route-options')).toBeVisible();
});}

test('first lie fails safely, blue button unlocks the door, checkpoint survives reload',async({page})=>{
 await page.getByRole('button',{name:'빨간 버튼',exact:true}).click();
 await expect(page.locator('.dialogue')).toContainText('원래대로');
 await page.getByRole('button',{name:'파란 버튼',exact:true}).click();
 await expect(page.locator('.scene')).toContainText('연결 완료');
 await page.getByRole('button',{name:'열린 출구로 이동',exact:true}).click();
 await expect(page.getByRole('heading',{level:1})).toHaveText('좌우 갈림길');
 await page.waitForTimeout(600);await page.reload();
 await expect(page.getByRole('heading',{level:1})).toHaveText('좌우 갈림길');
});

test('keyboard clues, journal, hints and accessibility controls',async({page})=>{
 await page.keyboard.press('e');await page.keyboard.press('j');
 await expect(page.getByRole('dialog')).toBeVisible();
 await expect(page.locator('.journal-entry')).toHaveCount(1);
 await page.keyboard.press('Escape');await page.keyboard.press('h');
 await expect(page.getByRole('dialog')).toContainText('주변을 관찰하기');
 await page.getByRole('button',{name:'다음 기록 펼치기'}).click();
 await expect(page.locator('.hint-card.revealed')).toHaveCount(2);
 await page.keyboard.press('Escape');
 await page.getByRole('button',{name:'설정',exact:true}).click();
 await page.getByRole('switch',{name:/고대비/}).click();
 await expect(page.locator('.app')).toHaveClass(/high-contrast/);
});
