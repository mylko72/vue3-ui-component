<template>
  <section aria-labelledby="title2">
    <div class="border-b pb-4">
      <h2 id="title2" class="text-5xl font-medium" tabindex="0">Menu</h2>
    </div>
    <div class="my-6">
      <h3 class="text-2xl">role=menu, menubar로 구현</h3>
      <p class="py-2">메뉴를 구현하는 방법은 여러 가지가 있는데, <span class="code-view">role="menu"</span>와 <span class="code-view">role="menubar"</span>로 구현한다.</p>
    </div>
    <div class="my-6">
      <h4 class="text-xl">상위 메뉴는 <span class="code-view">role="menubar"</span>, 하위 메뉴는 <span class="code-view">role="menu"</span></h4>
      <p class="py-2">
        전체 메뉴 컨테이너에 <span class="code-view">role="navigation"</span>과 aria-label를 사용하여 메뉴 네비게이션임을 안내한다. 상위 메뉴에 <span class="code-view">role="menubar"</span>와 <span class="code-view">role="menuitem"</span>을 삽입하고 그 하위 메뉴에는 <span class="code-view">role="menu"</span>와 <span class="code-view">role="menuitem"</span>을 사용한다.
      </p>
      <p class="py-2">
        상위 메뉴가 하위 메뉴를 가지고 있는 경우 <span class="code-view">aria-haspopup="true"</span>속성을 삽입하여 하위 메뉴가 있음을 스크린리더에서 읽게 하고,  하위 메뉴가 펼쳐졌을 때는 <span class="code-view">aria-expanded="true"</span>를 삽입하고 aria-controls 속성으로 하위 메뉴의 id 연결한다. 또한 하위 메뉴에 aria-labelledby를 상위 메뉴에 id와 연결하여 참조관계를 명확히 한다. 또한 하위 메뉴가 없는 상위 메뉴는 aria-haspopup 속성 자체가 삭제 되고, 펼쳐질 하위 메뉴가 없으므로 aria-expanded 와 aria-controls 속성 또한 삭제한다.
      </p>
    </div>
    <div class="my-6">
      <h3 class="text-2xl">✅  접근성 체크리스트</h3>
      <table class="tbl-chklist w-full xl:w-3/4">
        <thead>
          <tr>
            <th>항목</th>
            <th>설명</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="font-bold">role="menubar" / "menuitem"</td>
            <td>스크린리더가 메뉴임을 인식</td>
          </tr>
          <tr>
            <td class="font-bold">aria-haspopup="true"</td>
            <td>하위 메뉴 존재 여부 알림</td>
          </tr>
          <tr>
            <td class="font-bold">aria-expanded</td>
            <td>메뉴의 열림 상태를 스크린리더에 전달</td>
          </tr>
          <tr>
            <td class="font-bold">aria-controls / aria-labelledby</td>
            <td>참조 관계를 명확히 함</td>
          </tr>
          <tr>
            <td class="font-bold">Tab, Esc, ArrowKey</td>
            <td>키보드 내비게이션 구현</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="my-6">
      <h3 class="text-2xl">✅  키보드 내비게이션 흐름</h3>
      <table class="tbl-chklist w-full xl:w-3/4">
        <thead>
          <tr>
            <th>키</th>
            <th>동작 요약</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="font-bold">Tab</td>
            <td>메인 메뉴 버튼만 순차적으로 이동</td>
          </tr>
          <tr>
            <td class="font-bold">Enter</td>
            <td>해당 메인 메뉴 버튼의 서브 메뉴 열기</td>
          </tr>
          <tr>
            <td class="font-bold">Esc</td>
            <td>열려 있는 서브 메뉴를 닫고 해당 버튼에 포커스 복귀</td>
          </tr>
          <tr>
            <td class="font-bold">ArrowKey</td>
            <td>메인/서브 메뉴 간 방향 이동 (아래 참고)</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="my-6">
      <h3 class="text-2xl">✅  설명요약</h3>
      <table class="tbl-chklist w-full xl:w-3/4">
        <thead>
          <tr>
            <th>기능</th>
            <th>구현방식</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="font-bold">마우스 열기/닫기</td>
            <td>mouseover, mouseout 이벤트</td>
          </tr>
          <tr>
            <td class="font-bold">키보드 메뉴 열기</td>
            <td>Enter, Space, ArrowDown</td>
          </tr>
          <tr>
            <td class="font-bold">메뉴 간 이동</td>
            <td>ArrowLeft, ArrowRight</td>
          </tr>
          <tr>
            <td class="font-bold">ESC로 닫기</td>
            <td>Escape 키 처리</td>
          </tr>
          <tr>
            <td class="font-bold">Tab 흐름 제어</td>
            <td>서브 메뉴 마지막 항목에서 Tab → 다음 메인 메뉴로 포커스, 메뉴 닫기<br />
              서브 메뉴 첫 항목에서 Shift+Tab → 현재 메인 메뉴 버튼으로 포커스, 메뉴 닫힘
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="comp-view pt-8">
      <h3 class="text-2xl mb-8">✅  예제</h3>
      <h3 class="text-xl">메인 네비게이션</h3>
      <div class="my-6">
        <MenuNav :menus="menuLists" :direction="'horizontal'" :className="'main-menu'" />
      </div>
    </div>

    <div class="code-view mb-4">
      <h4 class="text-lg">/src/views/MenuView.vue</h4>
      <CodeBlock :code="menuNavCode" lang="vue" />
    </div>

    <div class="code-view">
      <h4 class="text-lg">@/components/navigation/MenuNav.vue</h4>
      <CodeBlock :code="sourceCode" lang="vue" />
    </div>
  </section>
</template>

<script setup>
import CodeBlock from '@/components/CodeBlock.vue'
import MenuNav from '@/components/navigation/MenuNav.vue';
import sourceCode from '@/components/navigation/MenuNav.vue?raw'
import { ref } from 'vue';

const menuLists = ref([
  {
    label: '예약',
    items: [
      {
        label: '항공권 예매',
        url: '#'
      },
      {
        label: '예약 확인',
        url: '#'
      },
      {
        label: '체크인 하기',
        url: '#'
      },
    ]
  },
  {
    label: '여행 준비',
    items: [
      {
        label: '수하물 안내',
        url: '#'
      },
      {
        label: '탑승 절차',
        url: '#'
      },
    ]
  },
  {
    label: '여행',
    items: [
      {
        label: '공항에서',
        url: '#'
      },
      {
        label: '기내에서',
        url: '#'
      },
    ]
  },
  {
    label: '아시아나 클럽',
    items: [
      {
        label: '마일리지 적립',
        url: '#'
      },
      {
        label: '마일리지 사용',
        url: '#'
      },
    ]
  },
  {
    label: '회원가입',
  }
])

const menuNavCode = `
<template>
  ...
  <MenuNav
    :menus="menuLists"
    :direction="'horizontal'"
    :className="'main-menu'"
  />
  ...
</template>

<script setup>
import MenuNav from '@/components/navigation/MenuNav.vue';
...
const menuLists = ref([
  {
    label: '예약',
    items: [
      {
        label: '항공권 예매',
        url: '#'
      },
      {
        label: '예약 확인',
        url: '#'
      },
      {
        label: '체크인 하기',
        url: '#'
      },
    ]
  },
  {
    label: '여행 준비',
    items: [
      {
        label: '수하물 안내',
        url: '#'
      },
      {
        label: '탑승 절차',
        url: '#'
      },
    ]
  },
  {
    label: '여행',
    items: [
      {
        label: '공항에서',
        url: '#'
      },
      {
        label: '기내에서',
        url: '#'
      },
    ]
  },
  {
    label: '아시아나 클럽',
    items: [
      {
        label: '마일리지 적립',
        url: '#'
      },
      {
        label: '마일리지 사용',
        url: '#'
      },
    ]
  },
  {
    label: '회원가입',
  }
])
...
</\script>
`.trim()

</script>

<style lang="scss" scoped>

</style>