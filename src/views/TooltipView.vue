<template>
  <section aria-labelledby="title2">
    <div class="border-b pb-4">
      <h2 id="title2" class="text-5xl font-medium" tabindex="0">Tooltip</h2>
    </div>
    <div class="my-6 mb-8">
      <h3 class="mb-1 text-lg font-bold">공통 접근성 기준</h3>
      <ul class="list-disc ml-4">
        <li>툴팁은 aria-describedby로 연결해 스크린 리더가 읽을 수 있어야 함</li>
        <li>키보드 접근(탭, 포커스)으로도 툴팁이 나타나야 함</li>
        <li>툴팁 콘텐츠는 보조기술 사용자에게 숨겨지지 않도록 적절히 표시</li>
      </ul>
    </div>
    <div class="comp-view">
      <h3 class="text-xl">Case 1. 약어 툴팁</h3>
      <div class="my-6">
        <table class="w-full table-fixed border-collapse border border-slate-300" cellpadding="10" cellspacing="0">
          <caption class="text-left mb-4"><strong class="text-lg">탑승객 정보</strong></caption>
          <thead>
            <tr>
              <th class="bg-slate-400 text-white text-left">탑승객 성명</th>
              <th class="bg-slate-400 text-white">회원번호</th>
              <th class="bg-slate-400 text-white">항공권번호</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border-b">
                <strong>성인</strong><br />
                <strong>KIM TEST</strong>
              </td>
              <td class="text-center border-b">
                <Tooltip tooltipClass="tooltip-trigger" tooltipId="tooltip-ke" direction="top">
                  <template #tooltipView>
                    <abbr title="대한항공">KE</abbr> 115217721501
                  </template>
                  <template #tooltipContent>
                    대한항공
                  </template>
                </Tooltip>
                <!-- <span class="tooltip-trigger" tabindex="0" aria-describedby="tooltip-ke">
                  <abbr title="대한항공">KE</abbr> 115217721501
                </span>
                <div id="tooltip-ke" class="tooltip" role="tooltip">
                  대한항공
                </div> -->
              </td>
              <td class="text-center border-b">180-2328758023</td>
            </tr>
            <tr>
              <td colspan="3">
                <div class="flex w-full">
                  <span class="w-1/2"><strong>연락처:</strong> 82-01000001111</span>
                  <span><strong>이메일:</strong> TE11ST@KOREANAIR.COM</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="comp-view">
      <h3 class="text-xl">Case 2. 말줄임 툴팁</h3>
      <div class="my-6">
        <section>
          <h4 class="text-lg font-bold">Select Flight</h4>
          <p>This is a list of currently available flights based on the selected fare type.</p>

          <article class="w-full border border-slate-300 mt-4 p-3">
            <header class="bg-blue-100 p-3">
              <strong>Seoul/Incheon</strong>(ICN) →
              <strong>New York - John F. Kennedy</strong>(JFK)
            </header>

            <div class="border border-slate-300 p-3 mt-3">
              <p>
                <strong>2019.10.14(Mon)</strong> |
                <strong>10:35–14:13</strong> |
                16h 38m |
                1 stop |
                <strong>9 Seats</strong>
              </p>

              <!-- First flight segment -->
              <div class="mt-3">
                <div class="flex flex-col">
                  <div class="flex">
                    <strong class="mr-2">KE7273</strong>
                    <Tooltip tooltipClass="tooltip-container" tooltipId="tooltip-se">
                      <template #tooltipView>
                        <span class="ellipsis">Seoul/Incheon(ICN)</span>
                      </template>
                      <template #tooltipContent>
                        Seoul/Incheon(ICN)
                      </template>
                    </Tooltip>
                    <!-- <div class="tooltip-container" tabindex="0" aria-describedby="tooltip-se">
                      <span class="ellipsis">Seoul/Incheon(ICN)</span>
                    </div>
                    <div id="tooltip-se" class="tooltip" role="tooltip">
                      Seoul/Incheon(ICN)
                    </div> -->
                    <span class="mx-2">→</span>
                    <Tooltip tooltipClass="tooltip-container" tooltipId="tooltip-de">
                      <template #tooltipView>
                        <span class="ellipsis">Detroit - Metropolitan (DTW)</span>
                      </template>
                      <template #tooltipContent>
                        Detroit - Metropolitan (DTW)
                      </template>
                    </Tooltip>
                    <!-- <div class="tooltip-container" tabindex="0" aria-describedby="tooltip-de">
                      <span class="ellipsis">Detroit - Metropolitan (DTW)</span>
                    </div>
                    <div id="tooltip-de" class="tooltip" role="tooltip">
                      Detroit - Metropolitan (DTW)
                    </div> -->
                  </div>

                  <p>Departure: 10:35 → Arrival: 10:27 (arrival before departure likely a typo)</p>
                  <p>Aircraft: Airbus Industries</p>
                </div>
                <p class="text-red-500">
                  ▲ operated by Delta Air Lines
                </p>
              </div>

              <!-- Second flight segment -->
              <div class="mt-3">
                <div class="flex flex-col">
                  <div class="flex">
                    <strong class="mr-2">DL5129</strong>
                    <Tooltip tooltipClass="tooltip-container" tooltipId="tooltip-de2">
                      <template #tooltipView>
                        <span class="ellipsis">Detroit - Metropolitan (DTW)</span>
                      </template>
                      <template #tooltipContent>
                        Detroit - Metropolitan (DTW)
                      </template>
                    </Tooltip>
                    <!-- <div class="tooltip-container" tabindex="0" aria-describedby="tooltip-de2">
                      <span class="ellipsis">Detroit - Metropolitan (DTW)</span>
                    </div>
                    <div id="tooltip-de2" class="tooltip" role="tooltip">
                      Detroit - Metropolitan (DTW)
                    </div> -->
                    <span class="mx-2">→</span>
                    <Tooltip tooltipClass="tooltip-container" tooltipId="tooltip-ny">
                      <template #tooltipView>
                        <span class="ellipsis">New York - John F. Kennedy(JFK)</span>
                      </template>
                      <template #tooltipContent>
                        New York-John F.Kennedy (JFK)
                      </template>
                    </Tooltip>
                    <!-- <div class="tooltip-container" tabindex="0" aria-describedby="tooltip-ny">
                      <span class="ellipsis">New York - John F. Kennedy(JFK)</span>
                    </div>
                    <div id="tooltip-ny" class="tooltip" role="tooltip">
                      New York-John F.Kennedy (JFK)
                    </div> -->
                  </div>
                  <p>Departure: 12:19 → Arrival: 14:13</p>
                  <p>Aircraft: Canadair Regional Jet</p>
                </div>
                <p class="text-red-500">
                  ▲ operated by ENDEAVOR AIR DBA DELTA CONNECTION
                </p>
              </div>
            </div>
          </article>
        </section>
      </div>
    </div>
    <div class="comp-view">
      <h3 class="text-xl">Case 3. 아이콘 툴팁</h3>
      <div class="my-6">
        <Tooltip tooltipClass="tooltip-icon" class="text-2xl text-slate-700" direction="top" role="button" aria-label="자세한 정보 보기" tooltipId="tooltip-info">
          <template #tooltipView>
            <PhFillInfo/>
          </template>
          <template #tooltipContent>
            이 페이지는 최신 정보 기준으로 제공됩니다.
          </template>
        </Tooltip>
        <!-- <span
          class="tooltip-icon text-2xl text-slate-700"
          tabindex="0"
          role="button"
          aria-label="자세한 정보 보기"
          aria-describedby="tooltip-info"
        >
          <PhFillInfo/>
        </span>
        <div id="tooltip-info" class="tooltip" role="tooltip">
          이 페이지는 최신 정보 기준으로 제공됩니다.
        </div> -->
      </div>
    </div>
  </section>
</template>

<script setup>
import Tooltip from '@/components/tooltip/Tooltip.vue';
import { PhFillInfo } from '@kalimahapps/vue-icons';

</script>

<style lang="scss" scoped>

</style>