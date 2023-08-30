import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

import ChallengesJSON from '../constants/ChallengesJSON.json'
import DifficultiesJSON from '../constants/DifficultiesJSON.json'
import TagsJSON from '../constants/TagsJSON.json'

import EventDTO from '../models/EventDTO'
import ChallengeDTO from '../models/ChallengeDTO'
import DifficultiesDTO from '../models/DifficultiesDTO'
import TagDTO from '../models/TagDTO'

const GET_CHALLENGE_URL = 'https://api.cyber-edu.co/v1/challenge';
const GET_DIFFICULTIES_URL = 'https://api.cyber-edu.co/v1/challenge/difficulties';
const GET_TAGS_URL = 'https://api.cyber-edu.co/v1/challenge/tags'

function removeDuplicates(arr: any) {
  let unique = arr.reduce(function (acc: any, curr: any) {
      if (!acc.includes(curr))
          acc.push(curr);
      return acc;
  }, []);
  return unique;
}

export const useServiceStore = defineStore('serviceStore',{  
  state: () =>{ 
    return {
      loading: false,
      currentWizardStep: 0,      
      currentEvent: new EventDTO(),
      ChallengesList: [] as Array<ChallengeDTO>,
      DifficultiesList: [] as Array<DifficultiesDTO>,
      TagsList: [] as Array<TagDTO>,
      EventList: [] as Array<EventDTO>,
      selectedRoute: 'Details'
    }
  },

  getters: {
    getSkillsOptions(state) {     
      return removeDuplicates(state.TagsList.map((x) => {
          return x.type
      }))
    },
    getDifficultiesOptions(state) {     
      return removeDuplicates(state.DifficultiesList.map((x) => {
          return x.name
      }))
    },
    getTagOptions(state) {     
      return removeDuplicates(state.TagsList.map((x) => {
          return x.name
      }))
    },
    getChallengesSummary(state){
      return state.ChallengesList.map((x) => {
        return {
          id: x.id,
          title: x.title,
          difficulty: x.difficulty,
          points: x.points,
          tags: x.tags,
        }
      })
    }
  },

  actions: {
    setLoading(value: boolean) {
      this.loading = value;
    },
    setCurrentWizardStep(index: number) {
      this.currentWizardStep = index;
    },
    incrementWizardStep() {
      this.currentWizardStep += 1;
    },
    updateCurrentEvent(eventDTO:EventDTO){
      this.currentEvent = eventDTO;
    },
    
    getChallengesListStatic () {
      return new Promise((resolve, reject) => {
        resolve({
          data: ChallengesJSON
          });
      });
    },
    
    getDifficultiesListStatic () {
      return new Promise((resolve, reject) => {
          resolve({
            data: DifficultiesJSON
          });
        });
      },
      
      getTagsListStatic () {
        return new Promise((resolve, reject) => {
          resolve({
            data: TagsJSON
          });
      });
    },

    addEventToList(eventDTO:EventDTO){
      this.EventList.push(eventDTO)
    },

    async getLockConfigurationSummary() {                
      this.loading = true
      
      return await Promise.all(
        [ 
          this.getChallengesListStatic(),
          this.getDifficultiesListStatic(),
          this.getTagsListStatic()
        ],
        )
        .then((APIResults:any) => {
          this.ChallengesList = APIResults[0].data.map((x:any) => {
            return {
              id: x.id,
              title: x.title,
              difficulty: x.difficulty,
              points: x.points,
              tags: x.tags,
              uniqueTagType: removeDuplicates(x.tags.map((y:any) => {return y.type})),
              uniqueTagNames: removeDuplicates(x.tags.map((y: any) => { return y.name }))
            }
          })
          this.DifficultiesList =  APIResults[1].data
          this.TagsList = APIResults[2].data
      })
      .catch((err) => console.log(err))
    },

    async getLockConfigurationSummaryTryCatch() {
      this.loading = true;
      
      try {
        const APIResults:any = await Promise.all([
          this.getChallengesListStatic(),
          this.getDifficultiesListStatic(),
          this.getTagsListStatic()
        ]);
    
        this.ChallengesList = APIResults[0].data;
        this.DifficultiesList = APIResults[1].data;
        this.TagsList = APIResults[2].data;
        
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },

    async getChallengesList() {      
      try {
          const response = await axios.get(GET_CHALLENGE_URL)
          const data = await response.data.json()
          this.ChallengesList = data
        } catch (error) {
          console.log('Axios error: ', error);
        }
    },
    
    async getDifficultiesList() {      
      try {
          const response = await axios.get(GET_DIFFICULTIES_URL)
          const data = await response.data.json()
          this.DifficultiesList = data
    
        } catch (error) {
          console.log('Axios error: ', error);
        }
    },
    
    async getTagsList() {      
      try {
          const response = await axios.get(GET_TAGS_URL)
          const data = await response.data.json()
    
          this.TagsList = data
        } catch (error) {
          console.log('Axios error: ', error);
        }
    }
    
    
  }
})