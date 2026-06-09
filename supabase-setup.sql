-- Supabase SQL Editor에서 실행하세요.
-- ideas 테이블 컬럼: id, category, title, description (desc 아님!)
-- 이미 ideas 테이블이 있다면 아래 RLS + 샘플 데이터만 실행하면 됩니다.

alter table ideas enable row level security;

drop policy if exists "Anyone can read ideas" on ideas;
drop policy if exists "Anyone can insert ideas" on ideas;
drop policy if exists "Anyone can delete ideas" on ideas;

create policy "Anyone can read ideas"
on ideas for select
using (true);

create policy "Anyone can insert ideas"
on ideas for insert
with check (true);

create policy "Anyone can delete ideas"
on ideas for delete
using (true);

-- 초기 샘플 데이터 (이미 데이터가 있으면 이 부분은 생략하세요)
insert into ideas (category, title, description) values
  ('AI', '제조 공정 불량 자동 검출', '생산 라인 영상을 학습해 불량품을 실시간으로 가려내는 시스템.'),
  ('바이오', '단백질 구조 예측 도우미', '신약 후보 물질의 단백질 구조를 빠르게 추정해 연구 기간을 단축.'),
  ('반도체', '소재 결함 데이터셋 구축', '반도체 소재의 결함 사례를 모아 분석용 데이터로 정리.');
